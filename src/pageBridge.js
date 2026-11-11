(function() {
  "use strict";
  (() => {
    const CHANNEL = "dac-bridge";
    const nativeFetch = window.fetch;
    const ACCOUNT_HEADER = "chatgpt-account-id";
    let observedAccountId = null;
    const readAccountHeader = (input, init) => {
      try {
        const headers = new Headers((init == null ? void 0 : init.headers) ?? (input instanceof Request ? input.headers : void 0));
        const accountId = headers.get(ACCOUNT_HEADER);
        if (accountId) {
          observedAccountId = accountId;
        }
      } catch {
      }
    };
    window.fetch = function(input, init) {
      const url = typeof input === "string" ? input : input == null ? void 0 : input.url;
      if (typeof url === "string" && url.includes("/backend-api/")) {
        readAccountHeader(input, init);
      }
      return nativeFetch.apply(this, arguments);
    };
    let authHeaders = null;
    let sessionAccountId = null;
    const requestHeadersFromSession = async () => {
      var _a;
      const response = await nativeFetch("/api/auth/session", {
        credentials: "include",
        cache: "no-store"
      });
      if (!response.ok) {
        return { headers: null, detail: `session-${response.status}` };
      }
      const session = await response.json();
      if (!(session == null ? void 0 : session.accessToken)) {
        return { headers: null, detail: (session == null ? void 0 : session.user) ? "no-token" : "no-session" };
      }
      sessionAccountId = typeof ((_a = session.account) == null ? void 0 : _a.id) === "string" ? session.account.id : null;
      return {
        headers: { authorization: `Bearer ${session.accessToken}` },
        detail: null
      };
    };
    const accountHeader = () => {
      const accountId = observedAccountId ?? sessionAccountId;
      return accountId ? { [ACCOUNT_HEADER]: accountId } : {};
    };
    const resolveHeaders = async () => {
      if (authHeaders == null ? void 0 : authHeaders.authorization) {
        return { headers: authHeaders, detail: null };
      }
      const session = await requestHeadersFromSession();
      if (session.headers) {
        authHeaders = session.headers;
      }
      return session;
    };
    const callBackend = async (path, method, body, isRetry = false) => {
      const { headers, detail } = await resolveHeaders();
      if (!headers) {
        console.warn(`[dac] no auth token from /api/auth/session: ${detail}`);
        return { ok: false, status: 0, error: "no-auth", detail };
      }
      const response = await nativeFetch(path, {
        method,
        credentials: "include",
        headers: {
          ...headers,
          ...accountHeader(),
          ...body ? { "content-type": "application/json" } : {}
        },
        body: body ? JSON.stringify(body) : void 0
      });
      if (response.status === 401 && !isRetry) {
        authHeaders = null;
        return callBackend(path, method, body, true);
      }
      if (!response.ok) {
        console.warn(`[dac] ${method} ${path} → ${response.status}`);
      }
      return { ok: response.ok, status: response.status };
    };
    const readAccount = async () => {
      var _a, _b, _c;
      const response = await nativeFetch("/api/auth/session", {
        credentials: "include",
        cache: "no-store"
      });
      if (!response.ok) {
        return { ok: false, status: response.status };
      }
      const session = await response.json();
      const sessionId = typeof ((_a = session == null ? void 0 : session.account) == null ? void 0 : _a.id) === "string" ? session.account.id : null;
      return {
        ok: true,
        status: response.status,
        loggedIn: Boolean(session == null ? void 0 : session.user),
        planType: typeof ((_b = session == null ? void 0 : session.account) == null ? void 0 : _b.planType) === "string" ? session.account.planType : null,
        structure: typeof ((_c = session == null ? void 0 : session.account) == null ? void 0 : _c.structure) === "string" ? session.account.structure : null,
        accountKeys: Object.keys((session == null ? void 0 : session.account) ?? {}).sort().join(","),
        // Откуда взят аккаунт для заголовка и совпал ли он с сессией — для разбора «не найдено»
        accountSource: observedAccountId ? "app" : "session",
        accountMatch: observedAccountId && sessionId ? observedAccountId === sessionId : null
      };
    };
    const ACTIONS = {
      "account-info": () => readAccount(),
      "delete-conversation": ({ id }) => callBackend(`/backend-api/conversation/id/${id}`, "DELETE"),
      "archive-conversation": ({ id }) => callBackend(`/backend-api/conversation/${id}`, "PATCH", { is_archived: true })
    };
    window.addEventListener("message", async (event) => {
      var _a, _b;
      if (event.source !== window || ((_a = event.data) == null ? void 0 : _a.channel) !== CHANNEL || ((_b = event.data) == null ? void 0 : _b.type) !== "request") {
        return;
      }
      const { requestId, action, payload } = event.data;
      const handler = ACTIONS[action];
      let result;
      try {
        result = handler ? await handler(payload ?? {}) : { ok: false, status: 0, error: "unknown-action" };
      } catch (e) {
        result = e instanceof TypeError ? { ok: false, status: 0, error: "network" } : { ok: false, status: 0, error: "exception", detail: `${e == null ? void 0 : e.name}: ${e == null ? void 0 : e.message}` };
      }
      window.postMessage({ channel: CHANNEL, type: "response", requestId, result }, "*");
    });
  })();
})();
