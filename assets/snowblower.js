/* Snowblower Size Picker. Planning estimates only; see "How the math works" on the page. */
(function(){
  var f=document.getElementById('sb');if(!f)return;
  var TAG='wellpumpplann-20',OVERLAP=0.15,TURN_S=10;
  var fmt=function(n,d){return isFinite(n)?n.toLocaleString('en-US',{minimumFractionDigits:d||0,maximumFractionDigits:d||0}):'—'};
  var val=function(n){var el=f.querySelector('[name="'+n+'"]');return el?parseFloat(el.value):NaN};
  var sel=function(n){var el=f.querySelector('[name="'+n+'"]');return el?el.value:''};
  var chk=function(n){var el=f.querySelector('[name="'+n+'"]');return !!(el&&el.checked)};
  var amz=function(q,label){return '<a href="https://www.amazon.com/s?k='+encodeURIComponent(q).replace(/%20/g,'+')+'&amp;tag='+TAG+'" rel="sponsored nofollow noopener" target="_blank">'+label+'</a> <span class="aff">(Amazon search · affiliate)</span>'};
  /* effective cut per pass in feet, after ~15% overlap (estimate) */
  var eff=function(inches){return inches/12*(1-OVERLAP)};
  function plan(L,W,extra,inches,fpm){
    var e=eff(inches),passes=W>0?Math.ceil(W/e-1e-9):0,dist=passes*L+(extra>0?extra/e:0),
        turns=Math.max(passes-1,0)+(extra>0?Math.ceil(extra/e/40):0),
        mins=dist/fpm+turns*TURN_S/60;
    return {passes:passes,dist:dist,mins:mins};
  }
  function run(){
    var L=val('len'),W=val('wid'),A=val('area'),extra=val('extra'),depth=val('depth'),fpm=val('pace')||176;
    var surface=sel('surface'),snow=sel('snow'),hills=chk('hills'),throwFar=chk('throw'),berm=chk('berm');
    var r=document.getElementById('sb-out');
    if(!(extra>0))extra=0;
    var haveLW=L>0&&W>0;
    if(!haveLW&&!(A>0)){r.className='result';r.innerHTML='Enter the driveway length and width in feet (or a total area), and your typical storm snowfall.';return}
    if(!(depth>0)){r.className='result';r.innerHTML='Enter how many inches a typical storm leaves on your driveway.';return}
    var drive=haveLW?L*W:A,total=drive+extra;
    /* if only area is known, model it as a strip of the same area at a typical 12 ft width (estimate) */
    var pL=haveLW?L:A/12,pW=haveLW?W:12;
    var why=[],warn=[],cls,width,widthTxt,klass,q,label,alt='';
    var gravel=surface!=='paved';
    var needTwo=gravel||depth>8||snow==='heavy'||hills||throwFar||berm||total>2000;
    if(gravel)why.push('Your surface is '+(surface==='gravel'?'gravel':'unpaved')+'. Single-stage augers run on the surface and pick up stones, so buying guides steer gravel and dirt drives to two-stage machines that ride slightly above the surface on adjustable skid shoes.');
    if(depth>8)why.push('A typical storm of '+fmt(depth)+' in is past the ~8 in that buying guides usually give as the comfortable limit for single-stage machines.');
    if(snow==='heavy')why.push('Heavy, wet or packed snow is where the two-stage auger-plus-impeller design is generally recommended.');
    if(hills)why.push('Slopes: two-stage machines are usually self-propelled (drive wheels or tracks); most single-stage machines rely on the auger to pull them along.');
    if(throwFar)why.push('A long throw (wide drive, or snow piled far from the edge) favors a two-stage impeller, which guides describe as throwing farther.');
    if(berm)why.push('The plow pile at the end of the drive is dense, icy snow, the hardest job a blower faces.');
    if(!needTwo){
      klass='Single-stage';
      width=total<=500?18:21;widthTxt=total<=500?'18–21 in':'21–22 in';
      why.unshift('Paved surface, typical storms of '+fmt(depth)+' in or less and '+(snow==='light'?'light':'average')+' snow: this is the job single-stage machines are built for. They are lighter, simpler and easier to store.');
      q='single stage snowblower '+width+' inch';label='Single-stage snowblowers, '+widthTxt;
      if(depth>6||snow!=='light')warn.push('You are near the edge of single-stage territory. If you get a few storms a year that are deeper or wetter than usual, a compact two-stage (21–24 in) covers both.');
      alt=amz('compact two stage snowblower 24 inch','Compact two-stage, 24 in');
      cls='ok';
    }else{
      var deepHeavy=depth>12&&(snow==='heavy'||berm)&&total>1200;
      if(total<=800&&depth<=12&&!throwFar){klass='Compact two-stage';width=24;widthTxt='21–24 in';q='compact two stage snowblower 24 inch';label='Compact two-stage snowblowers, 21–24 in';}
      else{
        klass=deepHeavy?'Two-stage (or three-stage)':'Two-stage';
        if(total<=1200){width=24;widthTxt='24 in'}
        else if(total<=2500){width=28;widthTxt='26–28 in'}
        else if(total<=4500){width=30;widthTxt='30 in'}
        else{width=30;widthTxt='30 in or wider'}
        q='two stage snowblower '+width+' inch';label='Two-stage snowblowers, '+widthTxt;
      }
      if(total>2000&&!gravel&&depth<=8&&snow!=='heavy'&&!hills&&!throwFar&&!berm)why.push('At about '+fmt(total)+' sq ft, a single-stage would work but takes many narrow passes; the wider two-stage decks cut the time.');
      if(deepHeavy){why.push('Deep, heavy storms on a big drive are where three-stage machines (an extra front accelerator) are marketed. Treat it as an option, not a requirement; a solid two-stage of the same width does the job.');alt=amz('three stage snowblower','Three-stage snowblowers');}
      if(depth>18)warn.push('Storms over ~18 in: check the intake height on the model page, and plan to clear once during the storm and again after.');
      if(gravel)warn.push('On gravel, set the skid shoes so the scraper bar rides above the stones, and leave a thin layer. It helps to wait for the ground to freeze before the first clearing.');
      if(hills)warn.push('On slopes, work up and down the hill, not across it, as owner’s manuals advise. Tracks are often suggested for steep grades.');
      cls='ok';
    }
    if(fpm>=176&&(depth>8||snow==='heavy'))warn.push('Deep or heavy snow usually means a slower walk. Try the ~1.5 or ~1 mph pace for a more realistic time.');
    var p=plan(pL,pW,extra,width,fpm);
    var h='<p style="margin:0 0 .4em"><span class="tag">Recommendation</span> <span class="est">planning estimate</span></p>'+
      '<p style="margin:.2em 0;font-size:1.15rem"><strong>'+klass+', '+widthTxt+' clearing width</strong></p>'+
      '<p style="margin:.2em 0">About <b>'+fmt(p.passes)+' passes</b>'+(haveLW?' down a '+fmt(L)+' × '+fmt(W)+' ft driveway':' (area modeled as a 12 ft wide strip)')+', '+fmt(p.dist)+' ft of walking'+(extra>0?' including '+fmt(extra)+' sq ft of walks':'')+', roughly <b>'+fmt(Math.max(p.mins,1))+' minutes</b> at ~'+fmt(fpm/88,1)+' mph walking. <span class="est">estimate</span></p>'+
      '<p style="margin:.6em 0 .2em"><strong>Why</strong></p><ul style="margin:.2em 0">'+why.map(function(s){return '<li>'+s+'</li>'}).join('')+'</ul>'+
      (warn.length?'<p style="margin:.6em 0 .2em"><strong>Watch for</strong></p><ul style="margin:.2em 0">'+warn.map(function(s){return '<li>'+s+'</li>'}).join('')+'</ul>':'')+
      '<p style="margin:.6em 0 .2em"><strong>Browse</strong></p><ul class="gear" style="margin:.2em 0"><li>'+amz(q,label)+'</li>'+(alt?'<li>'+alt+'</li>':'')+'</ul>';
    r.className='result '+cls;r.innerHTML=h;
    /* width comparison: settles 24 vs 28 with the same math */
    var rows=[18,21,24,26,28,30,34],tb=document.getElementById('sb-cmp');
    if(tb){
      var base=plan(pL,pW,extra,24,fpm).mins;
      tb.innerHTML=rows.map(function(w){var x=plan(pL,pW,extra,w,fpm),d=x.mins-base,rec=w===width;
        return '<tr'+(rec?' style="background:var(--ok-soft)"':'')+'><td data-h="Width"><strong>'+w+' in</strong>'+(rec?' ← pick':'')+(gravel&&w<=21?' <span class="small">(two-stage only on gravel)</span>':'')+'</td><td data-h="Passes">'+fmt(x.passes)+'</td><td data-h="Walking">'+fmt(x.dist)+' ft</td><td data-h="Time (est.)">~'+fmt(Math.max(x.mins,1))+' min'+(w===24?'':' <span class="small">('+(d<=0?'−':'+')+fmt(Math.abs(d),1)+' vs 24 in)</span>')+'</td></tr>'}).join('');
    }
  }
  f.addEventListener('submit',function(e){e.preventDefault();run()});
  f.addEventListener('input',run);f.addEventListener('change',run);run();
})();
