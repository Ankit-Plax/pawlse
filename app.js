const modes={
park:{temp:'Temp: 38.1°C',act:'Activity: High',hr:'Heart Trend: Active',
timeline:['09:10 Walk','09:40 Play spike','10:20 Cool down'],alerts:['Mild heat during play']},
lazy:{temp:'Temp: 37.4°C',act:'Activity: Low',hr:'Heart Trend: Steady',
timeline:['08:45 Nap','12:10 Snack','14:00 Window watching'],alerts:['Low activity day']},
storm:{temp:'Temp: 37.9°C',act:'Activity: Restless',hr:'Heart Trend: Jittery',
timeline:['18:05 Thunder start','18:30 Pacing','19:00 Calming'],alerts:['Noise stress pattern']}
};
function setMode(m){
const d=modes[m];
document.getElementById('temp').textContent=d.temp;
document.getElementById('act').textContent=d.act;
document.getElementById('hr').textContent=d.hr;
let t=document.getElementById('timeline');t.innerHTML='';
d.timeline.forEach(i=>{let li=document.createElement('li');li.textContent=i;t.appendChild(li);});
let a=document.getElementById('alertBox');a.innerHTML='';
d.alerts.forEach(i=>{let li=document.createElement('li');li.textContent=i;a.appendChild(li);});
}
setMode('park');
