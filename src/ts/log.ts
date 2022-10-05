const logPanel=document.getElementById("log-panel")
const logClear=document.getElementById("log-clear")

logClear?.addEventListener('click',()=>{
    if(logPanel)logPanel.innerHTML=''
})
namespace log{
    export function write(msg:string) {
        if(logPanel)logPanel.innerHTML+=msg+'<br>'
    }
}
export {log}