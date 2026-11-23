const devices={light:{name:'전등',watts:10,basis:'LED 전구 기준'},tv:{name:'TV',watts:100,basis:'40인치 미만 HD TV 기준'},ac:{name:'에어컨',watts:1000,basis:'방 1개용 에어컨 기준'}};
const form=document.getElementById('calculator'),power=document.getElementById('power'),count=document.getElementById('count'),minutes=document.getElementById('minutes');
const el=id=>document.getElementById(id);
let customPower='';
const selected=()=>devices[form.elements.device.value];
const fmt=n=>n.toLocaleString('ko-KR',{maximumFractionDigits:8});
function hideResult(){el('kwh').textContent='—';el('wh').textContent='입력하고 계산 버튼을 눌러 주세요.';el('message').innerHTML='불필요한 전원을 끄는 것부터,<br>에너지 절약이 시작돼요.';el('detail').hidden=true;}
function syncPower(){const unknown=form.elements.mode.value==='unknown',d=selected();power.disabled=unknown;power.value=unknown?d.watts:customPower;el('power-hint').textContent=unknown?`참고값 ${fmt(d.watts)} W 자동 적용 · ${d.basis}`:'제품이나 에너지소비효율 라벨을 확인해 주세요.';}
form.addEventListener('change',e=>{if(e.target.name==='device'||e.target.name==='mode')syncPower();hideResult();});
form.addEventListener('input',e=>{if(e.target===power&&!power.disabled)customPower=power.value;hideResult();});
document.querySelectorAll('[data-time]').forEach(button=>button.addEventListener('click',()=>{minutes.value=button.dataset.time;hideResult();}));
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const w=Number(power.value),n=Number(count.value),m=Number(minutes.value);if(!Number.isFinite(w*n*m)||w<=0||n<1||!Number.isInteger(n)||m<0)return;const wh=w*n*m/60,kwh=wh/1000;el('kwh').textContent=fmt(kwh);el('wh').textContent=`${fmt(wh)} Wh를 아꼈어요`;el('message').textContent=m===0?'시간을 늘리면 절약량도 함께 늘어나요.':`${selected().name} ${fmt(n)}개를 ${fmt(m)}분 꺼둔 작은 실천이에요.`;el('waste').textContent=`${fmt(wh)} Wh`;el('rate').textContent=m===0?'비교할 사용량 없음':'100%';el('formula').textContent=`${fmt(w)} W × ${fmt(n)}개 × (${fmt(m)} ÷ 60)시간 = ${fmt(wh)} Wh`;el('detail').hidden=false;});
