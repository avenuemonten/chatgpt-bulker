'use strict';
chrome.runtime.onMessage.addListener((message,sender,respond)=>{
 let origin;try{origin=new URL(sender.url||'').origin}catch{return}
 if(sender.id!==chrome.runtime.id||!sender.tab||origin!=='https://chatgpt.com')return;
 if(message?.type==='GET_TAB_ID')respond({tabId:sender.tab.id});
 if(message?.type==='ACTIVATE_TAB')chrome.tabs.update(sender.tab.id,{active:true}).catch(()=>{});
});
