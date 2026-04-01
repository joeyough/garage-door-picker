import { useState, useRef, useEffect, useCallback } from "react";

const C = {
  bg: "#F6F1EB", card: "#FFFFFF", text: "#1C1917", dim: "#78716C",
  accent: "#365D47", accentSoft: "#E4EDE7", accentGlow: "#4A8C65",
  warm: "#C2703E", warmSoft: "#FDF2EB", border: "#E7E0D8",
  like: "#2D8B5F", likeBg: "rgba(45,139,95,0.15)",
  skip: "#DC6B5A", skipBg: "rgba(220,107,90,0.15)",
  shadow: "0 2px 20px rgba(28,25,23,0.07)", lift: "0 12px 40px rgba(28,25,23,0.13)",
};

const F = {
  head: "'Palatino Linotype','Palatino','Book Antiqua',Georgia,serif",
  body: "-apple-system,'Segoe UI',Tahoma,Geneva,Verdana,sans-serif",
};

const SCREEN_STYLE = {
  padding: "28px 22px 120px", minHeight: "calc(100vh - 48px)",
  display: "flex", flexDirection: "column", animation: "fadeUp 0.32s ease-out",
};

/* ─── Clopay CDN ─── */
const CDN = "https://azcdn.clopay.com/CONFIGURATOR/IMAGES/V2/PIMAGES/";

/* ─── Real door image component ─── */
const DoorImage = ({ style, windows, color = "#F0EDE8" }) => {
  const styleData = STYLES.find(s => s.id === style);
  const imgFile = styleData?.img || "PSHORT-4R-8C.PNG";
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#E8E3DC" }}>
      <img
        src={`${CDN}${imgFile}`}
        alt={styleData?.name || "Garage Door"}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%", height: "100%", objectFit: "cover", display: "block",
          opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease",
        }}
      />
      {/* Color tint via multiply blend */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundColor: color,
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }} />
      {/* Subtle depth overlay for darker colors */}
      {isColorDark(color) && (
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 100%)",
          pointerEvents: "none",
        }} />
      )}
      {/* Window overlay */}
      {windows && (
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "27%",
          overflow: "hidden", pointerEvents: "none",
        }}>
          <img
            src={`${CDN}GLAZ-D-8C_21.PNG`}
            alt="Windows"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      )}
      {/* Loading shimmer */}
      {!loaded && (
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(110deg, #E8E3DC 30%, #F0EBE4 50%, #E8E3DC 70%)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s ease-in-out infinite",
        }} />
      )}
    </div>
  );
};

function isColorDark(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  return (r * 0.299 + g * 0.587 + b * 0.114) < 120;
}

/* ─── data ─── */
const STYLES = [
  { id: "raised", name: "Classic Raised Panel", tag: "Most Popular", tagC: C.accent, sub: "Traditional and timeless", img: "PSHORT-4R-8C.PNG" },
  { id: "carriage", name: "Carriage House", tag: "Classic Charm", tagC: C.warm, sub: "Elegant barn-door feel", img: "COACH-4R-8C.PNG" },
  { id: "long", name: "Long Raised Panel", tag: "Elegant Lines", tagC: "#8B5E3C", sub: "Elongated panel design", img: "PLONG-4R-8C.PNG" },
];

const DOOR_COLORS = [
  { id: "white", name: "White", hex: "#F0EDE8" },
  { id: "almond", name: "Almond", hex: "#E4D9C5" },
  { id: "sandstone", name: "Sandstone", hex: "#C9B99A" },
  { id: "desert", name: "Desert Tan", hex: "#BDA67E" },
  { id: "brown", name: "Brown", hex: "#6B4226" },
  { id: "black", name: "Black", hex: "#2A2A2A" },
  { id: "gray", name: "Slate Gray", hex: "#6B7B8D" },
  { id: "green", name: "Hunter Green", hex: "#2D4A3E" },
  { id: "red", name: "Barn Red", hex: "#8B3A3A" },
];

const STEPS = ["hero","photo","size","swipe","pick","preview","windows","insulation","color","final","contact","confirm","done"];

/* ─── House preview ─── */
const HousePreview = ({ doorStyle, doorColor, doorWindows, photoURL, size }) => {
  const dw = size==="double"?160:90, dx = size==="double"?70:105;
  return (
    <div style={{ position:"relative", borderRadius:16, overflow:"hidden", background:"#D5CFC7", aspectRatio:"4/3", boxShadow:C.lift }}>
      {photoURL ? (
        <img src={photoURL} alt="Your home" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
      ) : (
        <svg viewBox="0 0 300 225" width="100%" height="100%">
          <rect width="300" height="225" fill="#B6D4E8"/><rect y="140" width="300" height="85" fill="#8DB87C"/>
          <polygon points="40,140 150,60 260,140" fill="#A0522D"/><polygon points="40,140 150,60 260,140" fill="none" stroke="#8B4513" strokeWidth="2"/>
          <rect x="40" y="140" width="220" height="85" fill="#E8DCC8"/><rect x="40" y="140" width="220" height="85" fill="none" stroke="#C4B099" strokeWidth="1"/>
          <rect x="120" y="165" width="30" height="55" rx="1" fill="#7B5B3A"/><circle cx="145" cy="193" r="2" fill="#C4A050"/>
          <rect x="60" y="155" width="35" height="28" rx="1" fill="rgba(180,210,230,0.6)" stroke="#9BB" strokeWidth="1"/>
          <line x1="77.5" y1="155" x2="77.5" y2="183" stroke="#9BB" strokeWidth="0.8"/><line x1="60" y1="169" x2="95" y2="169" stroke="#9BB" strokeWidth="0.8"/>
          <rect x="185" y="155" width="35" height="28" rx="1" fill="rgba(180,210,230,0.6)" stroke="#9BB" strokeWidth="1"/>
          <line x1="202.5" y1="155" x2="202.5" y2="183" stroke="#9BB" strokeWidth="0.8"/><line x1="185" y1="169" x2="220" y2="169" stroke="#9BB" strokeWidth="0.8"/>
          <circle cx="250" cy="80" r="22" fill="#F5E642" opacity="0.8"/>
        </svg>
      )}
      <div style={{ position:"absolute", bottom:photoURL?"8%":0, left:photoURL?"50%":`${dx}px`, transform:photoURL?"translateX(-50%)":"none", width:photoURL?(size==="double"?"52%":"32%"):dw, height:photoURL?"38%":85, transition:"all 0.5s cubic-bezier(0.25,0.1,0.25,1)", filter:photoURL?"drop-shadow(0 2px 8px rgba(0,0,0,0.3))":"none", opacity:photoURL?0.92:1, borderRadius:2, overflow:"hidden" }}>
        <DoorImage style={doorStyle} windows={doorWindows} color={doorColor} />
      </div>
    </div>
  );
};

/* ─── velocity tracker ─── */
function useVelocityTracker() {
  const history = useRef([]);
  const track = useCallback((x,t)=>{const h=history.current;h.push({x,t});while(h.length>1&&t-h[0].t>80)h.shift();},[]);
  const getVelocity = useCallback(()=>{const h=history.current;if(h.length<2)return 0;const f=h[0],l=h[h.length-1];const dt=l.t-f.t;if(dt===0)return 0;return((l.x-f.x)/dt)*1000;},[]);
  const reset = useCallback(()=>{history.current=[];},[]);
  return { track, getVelocity, reset };
}

export default function GarageDoorVisualPicker() {
  const [step,setStep]=useState(0);
  const [sel,setSel]=useState({ size:"double", style:"raised", windows:false, insulation:null, color:DOOR_COLORS[0].hex, colorName:"White" });
  const [photoURL,setPhotoURL]=useState(null);
  const [liked,setLiked]=useState([]);
  const [swipeIdx,setSwipeIdx]=useState(0);
  const [holdProg,setHoldProg]=useState(0);
  const [holding,setHolding]=useState(false);
  const [sent,setSent]=useState(false);
  const [phone,setPhone]=useState("");
  const [name,setName]=useState("");
  const [contactMode,setContactMode]=useState(null);
  const [showInsInfo,setShowInsInfo]=useState(false);
  const [colorPulse,setColorPulse]=useState(0);

  const holdRef=useRef(null); const holdStart=useRef(null);
  const velocityTracker=useVelocityTracker();
  const cardRef=useRef(null); const activeCardRef=useRef(null);
  const bgCardRef=useRef(null); const keepStampRef=useRef(null); const passStampRef=useRef(null);
  const dragRef=useRef({ startX:0, startY:0, currentX:0, currentRot:0, currentScale:1, bgScale:0.94, grabY:0.5, dragging:false, flying:false });
  const rafRef=useRef(null); const animRef=useRef(null);

  const current=STEPS[step]; const total=STEPS.length;
  const go=(i)=>setStep(i);
  const next=useCallback(()=>setStep(s=>Math.min(s+1,total-1)),[total]);
  const back=()=>setStep(s=>Math.max(s-1,0));
  const pick=(k,v)=>{setSel(p=>({...p,[k]:v}));setTimeout(next,220);};
  const progress=step<=0?0:Math.round((step/(total-1))*100);
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  const cancelAnim=useCallback(()=>{if(animRef.current){cancelAnimationFrame(animRef.current);animRef.current=null;}},[]);

  const applyVisuals=useCallback((x,rot,scale=1,bgScale=0.94,flying=false)=>{
    const active=activeCardRef.current,bg=bgCardRef.current,keep=keepStampRef.current,pass=passStampRef.current;
    if(!active)return;
    const absX=Math.abs(x),keepVis=clamp(x/70,0,1),passVis=clamp(-x/70,0,1);
    const shadowBlur=20+Math.min(absX*0.12,22),shadowY=2+Math.min(absX*0.05,10),shadowOpacity=0.07+Math.min(absX*0.00045,0.11);
    const borderColor=x>20?`rgba(45,139,95,${Math.min(x/130,0.65)})`:x<-20?`rgba(220,107,90,${Math.min(-x/130,0.65)})`:C.border;
    active.style.transform=`translate3d(${x}px,0,0) rotate(${rot}deg) scale(${scale})`;
    active.style.boxShadow=`0 ${shadowY}px ${shadowBlur}px rgba(28,25,23,${shadowOpacity})`;
    active.style.borderColor=borderColor;
    active.style.opacity=flying?"0":"1";
    if(bg){const y=14-(bgScale-0.94)*120;const opacity=0.35+(bgScale-0.94)*8;bg.style.transform=`scale(${bgScale}) translateY(${y}px)`;bg.style.opacity=`${opacity}`;}
    if(keep){keep.style.opacity=`${keepVis}`;keep.style.transform=`rotate(-12deg) scale(${0.6+keepVis*0.4})`;}
    if(pass){pass.style.opacity=`${passVis}`;pass.style.transform=`rotate(12deg) scale(${0.6+passVis*0.4})`;}
    dragRef.current.currentX=x;dragRef.current.currentRot=rot;dragRef.current.currentScale=scale;dragRef.current.bgScale=bgScale;
  },[]);

  const queueVisuals=useCallback((x,rot,scale=1,bgScale=0.94,flying=false)=>{
    if(rafRef.current)cancelAnimationFrame(rafRef.current);
    rafRef.current=requestAnimationFrame(()=>{applyVisuals(x,rot,scale,bgScale,flying);});
  },[applyVisuals]);

  const resetCardVisuals=useCallback(()=>{queueVisuals(0,0,1,0.94,false);},[queueVisuals]);

  const springToOrigin=useCallback(()=>{
    cancelAnim();let x=dragRef.current.currentX,v=velocityTracker.getVelocity()*0.08,rot=dragRef.current.currentRot,rotV=0;
    const stiffness=0.11,damping=0.82;
    const tick=()=>{v=(v+(-x*stiffness))*damping;x+=v;rotV=(rotV+(-rot*stiffness))*damping;rot+=rotV;
      const bgScale=0.94+Math.min(Math.abs(x)/160,1)*0.05;queueVisuals(x,rot,1,bgScale,false);
      if(Math.abs(x)<0.5&&Math.abs(v)<0.5&&Math.abs(rot)<0.08&&Math.abs(rotV)<0.08){resetCardVisuals();cancelAnim();return;}
      animRef.current=requestAnimationFrame(tick);};
    animRef.current=requestAnimationFrame(tick);
  },[cancelAnim,queueVisuals,resetCardVisuals,velocityTracker]);

  const completeSwipe=useCallback((dir)=>{
    if(dir==="right")setLiked(prev=>[...prev,STYLES[swipeIdx]]);
    if(swipeIdx>=STYLES.length-1){resetCardVisuals();next();return;}
    setSwipeIdx(i=>i+1);
    requestAnimationFrame(()=>{if(activeCardRef.current){activeCardRef.current.style.transition="none";activeCardRef.current.style.opacity="1";}resetCardVisuals();});
  },[next,resetCardVisuals,swipeIdx]);

  const flyOut=useCallback((dir,releaseVelocity=0)=>{
    cancelAnim();dragRef.current.flying=true;
    let x=dragRef.current.currentX,rot=dragRef.current.currentRot,v=Math.max(Math.abs(releaseVelocity),900);
    const direction=dir==="right"?1:-1;v*=direction;const targetRot=dir==="right"?18:-18;
    const tick=()=>{v*=1.02;x+=v/60;rot+=(targetRot-rot)*0.18;queueVisuals(x,rot,0.98,0.99,false);
      if(Math.abs(x)>window.innerWidth*1.15){if(activeCardRef.current)activeCardRef.current.style.opacity="0";cancelAnim();dragRef.current.flying=false;completeSwipe(dir);return;}
      animRef.current=requestAnimationFrame(tick);};
    animRef.current=requestAnimationFrame(tick);
  },[cancelAnim,completeSwipe,queueVisuals]);

  const onDragStart=useCallback((clientX,clientY)=>{
    if(dragRef.current.flying)return;cancelAnim();velocityTracker.reset();
    dragRef.current.dragging=true;dragRef.current.startX=clientX;dragRef.current.startY=clientY;
    if(cardRef.current){const rect=cardRef.current.getBoundingClientRect();dragRef.current.grabY=clamp((clientY-rect.top)/rect.height,0,1);}else{dragRef.current.grabY=0.5;}
    velocityTracker.track(clientX,performance.now());
  },[cancelAnim,velocityTracker]);

  const onDragMove=useCallback((clientX)=>{
    if(!dragRef.current.dragging||dragRef.current.flying)return;
    const dx=clientX-dragRef.current.startX;velocityTracker.track(clientX,performance.now());
    const grabFactor=(dragRef.current.grabY-0.5)*-2;const rot=dx*0.055*(0.65+Math.abs(grabFactor)*0.85);
    const dist=Math.abs(dx);queueVisuals(dx,rot,1-Math.min(dist/900,0.035),0.94+Math.min(dist/150,1)*0.05,false);
  },[queueVisuals,velocityTracker]);

  const onDragEnd=useCallback(()=>{
    if(!dragRef.current.dragging)return;dragRef.current.dragging=false;
    const dx=dragRef.current.currentX,velocity=velocityTracker.getVelocity();
    if(Math.abs(dx)>110||(Math.abs(velocity)>700&&Math.abs(dx)>18)){flyOut(dx>=0?"right":"left",velocity);}else{springToOrigin();}
  },[flyOut,springToOrigin,velocityTracker]);

  const tapKeep=useCallback(()=>{if(dragRef.current.flying)return;queueVisuals(24,2.5,0.995,0.96,false);setTimeout(()=>flyOut("right",1000),55);},[flyOut,queueVisuals]);
  const tapPass=useCallback(()=>{if(dragRef.current.flying)return;queueVisuals(-24,-2.5,0.995,0.96,false);setTimeout(()=>flyOut("left",-1000),55);},[flyOut,queueVisuals]);

  useEffect(()=>{
    if(holding&&current==="confirm"){holdStart.current=Date.now();
      const tick=()=>{const p=Math.min((Date.now()-holdStart.current)/1600,1);setHoldProg(p);if(p>=1){setSent(true);setHolding(false);setTimeout(next,500);return;}holdRef.current=requestAnimationFrame(tick);};
      holdRef.current=requestAnimationFrame(tick);
    }else{if(holdRef.current)cancelAnimationFrame(holdRef.current);if(!sent)setHoldProg(0);}
    return()=>{if(holdRef.current)cancelAnimationFrame(holdRef.current);};
  },[holding,current,sent,next]);

  useEffect(()=>()=>{if(rafRef.current)cancelAnimationFrame(rafRef.current);if(animRef.current)cancelAnimationFrame(animRef.current);},[]);

  const ss = {
    wrap:{fontFamily:F.body,background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",position:"relative",overflow:"hidden",color:C.text,WebkitFontSmoothing:"antialiased"},
    prog:{position:"sticky",top:0,zIndex:100,background:"rgba(246,241,235,0.95)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`,padding:"12px 20px 8px"},
    track:{height:3,borderRadius:2,background:C.border},
    fill:{height:"100%",borderRadius:2,background:`linear-gradient(90deg,${C.accent},${C.accentGlow})`,transition:"width 0.5s ease",width:`${progress}%`},
    h1:{fontFamily:F.head,fontSize:30,fontWeight:400,lineHeight:1.22,margin:"0 0 6px",color:C.text},
    h2:{fontFamily:F.head,fontSize:26,fontWeight:400,lineHeight:1.25,margin:"0 0 6px"},
    sub:{fontSize:15,color:C.dim,lineHeight:1.5,margin:"0 0 24px"},
    btn:{display:"flex",alignItems:"center",justifyContent:"center",gap:8,width:"100%",padding:"20px 24px",borderRadius:16,border:"none",fontSize:17,fontWeight:600,fontFamily:F.body,cursor:"pointer",transition:"all 0.15s",WebkitTapHighlightColor:"transparent",marginBottom:12,minHeight:60},
    pri:{background:C.accent,color:"#fff"},
    sec:{background:C.card,color:C.text,border:`2px solid ${C.border}`},
    card:{display:"flex",alignItems:"center",gap:14,width:"100%",padding:"20px 22px",borderRadius:16,border:`2px solid ${C.border}`,background:C.card,fontSize:16,fontWeight:500,fontFamily:F.body,cursor:"pointer",transition:"all 0.15s",marginBottom:12,textAlign:"left",boxShadow:C.shadow,WebkitTapHighlightColor:"transparent",minHeight:68},
    backBtn:{position:"fixed",bottom:24,left:20,width:50,height:50,borderRadius:"50%",border:`1px solid ${C.border}`,background:C.card,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,cursor:"pointer",boxShadow:C.shadow,zIndex:90,color:C.dim},
    tag:(bg)=>({display:"inline-block",padding:"3px 9px",borderRadius:20,fontSize:10,fontWeight:700,letterSpacing:"0.05em",textTransform:"uppercase",color:"#fff",background:bg}),
    input:{width:"100%",padding:"18px 20px",borderRadius:14,border:`2px solid ${C.border}`,fontSize:18,fontFamily:F.body,background:C.card,outline:"none",boxSizing:"border-box"},
  };

  const insCtaLabel=sel.insulation==="yes"?"Continue with insulated →":sel.insulation==="no"?"Continue with standard →":sel.insulation==="unsure"?"Continue — we'll help you decide →":null;
  const insSelectedLabel=sel.insulation==="yes"?"Insulated":sel.insulation==="no"?"Standard":sel.insulation==="unsure"?"We'll help you decide":null;
  const contactCtaLabel=contactMode==="phone"?"Send to Mary Anne →":contactMode==="text"?"Text me this design →":"Continue →";

  const render = () => {
    switch (current) {

      case "hero":
        return (
          <div style={SCREEN_STYLE}>
            <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
              <div style={{ marginBottom:22, borderRadius:20, overflow:"hidden", background:C.card, border:`1px solid ${C.border}`, boxShadow:C.lift }}>
                <HousePreview doorStyle="raised" doorColor="#F0EDE8" doorWindows={true} photoURL={null} size="double" />
              </div>
              <h1 style={{ ...ss.h1, fontSize:32 }}>See your new garage door on your home</h1>
              <p style={{ ...ss.sub, marginBottom:32 }}>Pick a style, choose a color, and see it on your house — all in under a minute.</p>
              <button style={{ ...ss.btn, ...ss.pri }} onClick={next}>Let's go →</button>
              <button style={{ ...ss.btn, ...ss.sec }} onClick={()=>go(1)}>📷 Upload a photo first</button>
            </div>
          </div>
        );

      case "photo":
        return (
          <div style={{ ...SCREEN_STYLE, padding:"22px 22px 108px" }}>
            <h2 style={{ ...ss.h2, marginBottom:4 }}>Got a photo of your house?</h2>
            <p style={{ ...ss.sub, marginBottom:16 }}>Stand back a bit and capture the garage door and some of the front of your home. This helps us place your new door more accurately.</p>
            <div style={{ background:C.card, borderRadius:16, padding:4, marginBottom:16, border:`1px solid ${C.border}`, boxShadow:C.shadow, overflow:"hidden" }}>
              <div style={{ borderRadius:12, overflow:"hidden", aspectRatio:"16/8.5", position:"relative" }}>
                <svg viewBox="0 0 320 200" width="100%" height="100%">
                  <rect width="320" height="200" fill="#C5DBE8"/>
                  <rect y="120" width="320" height="80" fill="#93C47D"/>
                  <polygon points="20,120 160,35 300,120" fill="#B0764F"/>
                  <rect x="20" y="120" width="280" height="80" fill="#E8DCC8" stroke="#C4B099" strokeWidth="0.5"/>
                  <rect x="80" y="148" width="24" height="52" rx="1" fill="#7B5B3A"/>
                  <circle cx="99" cy="176" r="1.5" fill="#C4A050"/>
                  <rect x="38" y="140" width="28" height="24" rx="1" fill="rgba(180,210,230,0.6)" stroke="#9BB" strokeWidth="0.8"/>
                  <rect x="120" y="140" width="28" height="24" rx="1" fill="rgba(180,210,230,0.6)" stroke="#9BB" strokeWidth="0.8"/>
                  <rect x="175" y="130" width="95" height="70" rx="2" fill="#C8C3BB" stroke="#999" strokeWidth="1.5"/>
                  {[0,1,2,3].map(i=><line key={i} x1="178" y1={142+i*14} x2="267" y2={142+i*14} stroke="#B3AEA8" strokeWidth="0.7"/>)}
                  <rect x="175" y="195" width="95" height="5" rx="1" fill="#C4B899" opacity="0.5"/>
                  <line x1="12" y1="28" x2="12" y2="48" stroke="rgba(54,93,71,0.45)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="28" x2="32" y2="28" stroke="rgba(54,93,71,0.45)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="308" y1="28" x2="308" y2="48" stroke="rgba(54,93,71,0.45)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="308" y1="28" x2="288" y2="28" stroke="rgba(54,93,71,0.45)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="192" x2="12" y2="172" stroke="rgba(54,93,71,0.45)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="12" y1="192" x2="32" y2="192" stroke="rgba(54,93,71,0.45)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="308" y1="192" x2="308" y2="172" stroke="rgba(54,93,71,0.45)" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="308" y1="192" x2="288" y2="192" stroke="rgba(54,93,71,0.45)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(246,241,235,0.25) 0%, transparent 18%, transparent 82%, rgba(246,241,235,0.25) 100%)", pointerEvents:"none" }}/>
              </div>
              <div style={{ padding:"10px 14px 8px", display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:16 }}>📸</span>
                <span style={{ fontSize:13, color:C.dim, lineHeight:1.4 }}>Try to capture the garage door and some of the front of the house</span>
              </div>
            </div>
            <label style={{ ...ss.card, justifyContent:"center", flexDirection:"column", padding:photoURL?"18px 18px":"24px 18px", borderStyle:photoURL?"solid":"dashed", borderColor:photoURL?C.accent:C.border, background:photoURL?C.accentSoft:C.card, cursor:"pointer", marginBottom:10 }}>
              <input type="file" accept="image/*" capture="environment" style={{ display:"none" }} onChange={(e)=>{const f=e.target.files?.[0];if(f)setPhotoURL(URL.createObjectURL(f));}}/>
              <div style={{ fontSize:38, marginBottom:10 }}>{photoURL?"✅":"📸"}</div>
              <div style={{ fontSize:16, fontWeight:600, color:photoURL?C.accent:C.dim }}>{photoURL?"Photo added!":"Tap to take or upload a photo"}</div>
              {photoURL&&<div style={{ fontSize:13, color:C.accent, marginTop:4, opacity:0.7 }}>Tap again to change</div>}
            </label>
            <button style={{ ...ss.btn, ...ss.pri, marginTop:4 }} onClick={next}>{photoURL?"Next →":"Skip — use example home"}</button>
          </div>
        );

      case "size":
        return (
          <div style={SCREEN_STYLE}>
            <h2 style={ss.h2}>How wide is your garage?</h2>
            <p style={ss.sub}>No tape measure needed — just your best guess. We'll verify later.</p>
            {[{val:"single",icon:"🚗",label:"Single car",hint:"~8–9 ft wide"},{val:"double",icon:"🚗🚗",label:"Double car",hint:"~16 ft wide"},{val:"double",icon:"🤷",label:"Not sure",hint:"That's fine — we'll measure"}].map(o=>(
              <button key={o.label} style={ss.card} onClick={()=>pick("size",o.val)}>
                <span style={{fontSize:28}}>{o.icon}</span>
                <div><div style={{fontWeight:600,fontSize:17}}>{o.label}</div><div style={{fontSize:13,color:C.dim}}>{o.hint}</div></div>
              </button>
            ))}
          </div>
        );

      case "swipe": {
        const done=swipeIdx>=STYLES.length; const cur=!done?STYLES[swipeIdx]:null;
        return (
          <div style={SCREEN_STYLE}>
            <h2 style={ss.h2}>Swipe through styles</h2>
            <p style={ss.sub}>Flick to skip, or swipe right to save. Faster = more fun.</p>
            {!done&&cur?(
              <>
                <div style={{position:"relative",height:360,marginBottom:16,userSelect:"none",touchAction:"pan-y",cursor:dragRef.current.dragging?"grabbing":"grab"}}
                  onTouchStart={e=>onDragStart(e.touches[0].clientX,e.touches[0].clientY)}
                  onTouchMove={e=>{if(dragRef.current.dragging)e.preventDefault();onDragMove(e.touches[0].clientX);}}
                  onTouchEnd={onDragEnd} onTouchCancel={onDragEnd}
                  onMouseDown={e=>{e.preventDefault();onDragStart(e.clientX,e.clientY);const hm=ev=>onDragMove(ev.clientX);const hu=()=>{onDragEnd();window.removeEventListener("mousemove",hm);window.removeEventListener("mouseup",hu);};window.addEventListener("mousemove",hm);window.addEventListener("mouseup",hu);}}
                >
                  {swipeIdx<STYLES.length-1&&(
                    <div ref={bgCardRef} style={{position:"absolute",inset:0,background:C.card,borderRadius:20,border:`1px solid ${C.border}`,transform:"scale(0.94) translateY(14px)",opacity:0.35,overflow:"hidden",willChange:"transform, opacity",pointerEvents:"none"}}>
                      <div style={{height:210,background:"#EDE9E3",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
                        <DoorImage style={STYLES[Math.min(swipeIdx+1,STYLES.length-1)].id} windows={false} color="#D8D3CC" />
                      </div>
                    </div>
                  )}
                  <div ref={node=>{activeCardRef.current=node;cardRef.current=node;}} style={{position:"absolute",inset:0,background:C.card,borderRadius:20,boxShadow:C.shadow,border:`1.5px solid ${C.border}`,transform:"translate3d(0,0,0) rotate(0deg) scale(1)",overflow:"hidden",willChange:"transform, box-shadow, border-color, opacity"}}>
                    <div ref={keepStampRef} style={{position:"absolute",top:22,left:18,zIndex:5,padding:"8px 20px",borderRadius:8,border:`4px solid ${C.like}`,background:"rgba(45,139,95,0.12)",color:C.like,fontSize:30,fontWeight:900,letterSpacing:"0.1em",transform:"rotate(-12deg) scale(0.6)",opacity:0,pointerEvents:"none"}}>KEEP</div>
                    <div ref={passStampRef} style={{position:"absolute",top:22,right:18,zIndex:5,padding:"8px 20px",borderRadius:8,border:`4px solid ${C.skip}`,background:"rgba(220,107,90,0.12)",color:C.skip,fontSize:30,fontWeight:900,letterSpacing:"0.1em",transform:"rotate(12deg) scale(0.6)",opacity:0,pointerEvents:"none"}}>PASS</div>
                    <div style={{height:210,background:"#EDE9E3",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
                      <DoorImage style={cur.id} windows={false} color="#D8D3CC" />
                    </div>
                    <div style={{padding:"20px 24px"}}>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                        <span style={{fontSize:20,fontWeight:700}}>{cur.name}</span>
                        <span style={ss.tag(cur.tagC)}>{cur.tag}</span>
                      </div>
                      <p style={{fontSize:15,color:C.dim,margin:0,lineHeight:1.4}}>{cur.sub}</p>
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",gap:28,justifyContent:"center",alignItems:"center"}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                    <button onClick={tapPass} style={{width:96,height:96,borderRadius:"50%",border:`3px solid ${C.skip}`,background:C.card,fontSize:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:C.shadow,color:C.skip,WebkitTapHighlightColor:"transparent"}}>✕</button>
                    <span style={{fontSize:12,fontWeight:600,color:C.skip,letterSpacing:"0.02em"}}>Pass</span>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <div style={{fontSize:14,color:C.dim,fontWeight:600}}>{swipeIdx+1} / {STYLES.length}</div>
                    <div style={{fontSize:13,fontWeight:700,color:liked.length>0?C.accent:C.dim}}>{liked.length>0?`${liked.length} saved`:"0 saved"}</div>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                    <button onClick={tapKeep} style={{width:96,height:96,borderRadius:"50%",border:`3px solid ${C.like}`,background:C.card,fontSize:38,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:C.shadow,color:C.like,WebkitTapHighlightColor:"transparent"}}>♥</button>
                    <span style={{fontSize:12,fontWeight:600,color:C.like,letterSpacing:"0.02em"}}>Save</span>
                  </div>
                </div>
              </>
            ):(
              <div style={{textAlign:"center",padding:"40px 0"}}>
                <div style={{fontSize:44,marginBottom:16}}>✨</div>
                <p style={{fontSize:17,color:C.dim,fontWeight:500}}>{liked.length>0?`You liked ${liked.length} style${liked.length>1?"s":""}!`:"Let's pick a style for you."}</p>
                <button style={{...ss.btn,...ss.pri,marginTop:20}} onClick={next}>Pick your favorite →</button>
              </div>
            )}
          </div>
        );
      }

      case "pick": {
        const options=liked.length>0?liked:STYLES;
        return (
          <div style={SCREEN_STYLE}>
            <h2 style={ss.h2}>{liked.length>0?"You liked these":"Pick your style"}</h2>
            <p style={ss.sub}>Pick your favorite to see what it looks like on your home.</p>
            {options.map(s2=>(
              <button key={s2.id} style={{...ss.card,flexDirection:"column",alignItems:"stretch",padding:0,overflow:"hidden"}} onClick={()=>pick("style",s2.id)}>
                <div style={{height:130,background:"#EDE9E3",display:"flex",alignItems:"center",justifyContent:"center",padding:0,overflow:"hidden"}}>
                  <DoorImage style={s2.id} windows={false} color="#D8D3CC" />
                </div>
                <div style={{padding:"16px 20px",display:"flex",alignItems:"center",gap:10}}>
                  <span style={{fontWeight:700,fontSize:17}}>{s2.name}</span>
                  <span style={ss.tag(s2.tagC)}>{s2.tag}</span>
                </div>
              </button>
            ))}
          </div>
        );
      }

      case "preview":
        return (
          <div style={SCREEN_STYLE}>
            <h2 style={ss.h2}>Here's your door</h2>
            <p style={ss.sub}>{photoURL?"We've placed it on your home.":"Here's how it looks on a sample home."}</p>
            <div style={{animation:"doorReveal 0.7s cubic-bezier(0.25,0.1,0.25,1)"}}>
              <HousePreview doorStyle={sel.style} doorColor={sel.color} doorWindows={sel.windows} photoURL={photoURL} size={sel.size}/>
            </div>
            <button style={{...ss.btn,...ss.pri,marginTop:24}} onClick={next}>Looks good — keep going →</button>
            <button style={{...ss.btn,...ss.sec}} onClick={()=>go(STEPS.indexOf("pick"))}>Change style</button>
          </div>
        );

      case "windows":
        return (
          <div style={SCREEN_STYLE}>
            <h2 style={ss.h2}>Add windows?</h2>
            <p style={ss.sub}>Windows let in natural light and add curb appeal. See the difference below.</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              {[true,false].map(w=>(
                <button key={String(w)} onClick={()=>setSel(p=>({...p,windows:w}))} style={{padding:0,borderRadius:16,overflow:"hidden",cursor:"pointer",border:sel.windows===w?`3px solid ${C.accent}`:`2px solid ${C.border}`,background:C.card,boxShadow:C.shadow,transition:"all 0.2s",WebkitTapHighlightColor:"transparent"}}>
                  <div style={{height:110,background:"#EDE9E3",display:"flex",alignItems:"center",justifyContent:"center",padding:0,overflow:"hidden"}}>
                    <DoorImage style={sel.style} windows={w} color={sel.color} />
                  </div>
                  <div style={{padding:"14px 14px",fontSize:15,fontWeight:600,textAlign:"center"}}>{w?"☀️ With Windows":"🚫 No Windows"}</div>
                </button>
              ))}
            </div>
            <div style={{ textAlign:"center", fontSize:14, fontWeight:600, color:C.accent, marginBottom:10, animation:"fadeUp 0.2s ease-out" }}>
              Selected: {sel.windows ? "With Windows" : "No Windows"}
            </div>
            <button style={{ ...ss.btn, ...ss.pri, marginTop:4 }} onClick={next}>
              {sel.windows ? "Continue with windows →" : "Continue without windows →"}
            </button>
          </div>
        );

      case "insulation":
        return (
          <div style={SCREEN_STYLE}>
            <h2 style={ss.h2}>Want a stronger, insulated door?</h2>
            <p style={ss.sub}>Insulated doors are quieter, more durable, and keep your garage comfortable year round.</p>
            {[
              {val:"yes",icon:"🛡️",label:"Yes, insulated",hint:"Recommended for attached garages",rec:true},
              {val:"no",icon:"💨",label:"Standard is fine",hint:"Single-layer, lighter weight"},
              {val:"unsure",icon:"🤔",label:"Not sure yet",hint:"We can help you decide"},
            ].map(o=>(
              <button key={o.val} style={{
                ...ss.card,
                border:sel.insulation===o.val?`2.5px solid ${C.accent}`:o.rec&&!sel.insulation?`2px solid ${C.accent}`:`2px solid ${C.border}`,
                background:sel.insulation===o.val?C.accentSoft:o.rec&&!sel.insulation?C.accentSoft:C.card,
              }} onClick={()=>setSel(p=>({...p,insulation:o.val}))}>
                <span style={{fontSize:28}}>{o.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,fontSize:16,display:"flex",alignItems:"center",gap:8}}>
                    {o.label}
                    {sel.insulation===o.val&&<span style={{fontSize:16,color:C.accent}}>✓</span>}
                    {o.rec&&!sel.insulation&&<span style={{...ss.tag(C.accent),fontSize:9}}>RECOMMENDED</span>}
                  </div>
                  <div style={{fontSize:13,color:C.dim,marginTop:2}}>{o.hint}</div>
                </div>
              </button>
            ))}
            {sel.insulation&&(<div style={{textAlign:"center",fontSize:14,fontWeight:600,color:C.accent,marginBottom:4,marginTop:-4,animation:"fadeUp 0.2s ease-out"}}>Selected: {insSelectedLabel}</div>)}
            {sel.insulation&&(<button style={{...ss.btn,...ss.pri,marginTop:8,marginBottom:14,animation:"fadeUp 0.25s ease-out"}} onClick={next}>{insCtaLabel}</button>)}
            <button onClick={()=>setShowInsInfo(!showInsInfo)} style={{background:showInsInfo?C.accentSoft:C.card,border:`2px solid ${C.accent}`,borderRadius:14,color:C.accent,fontSize:16,fontWeight:700,cursor:"pointer",padding:"18px 22px",fontFamily:F.body,display:"flex",alignItems:"center",gap:10,width:"100%",transition:"all 0.2s",WebkitTapHighlightColor:"transparent",marginTop:4,boxShadow:C.shadow}}>
              <span style={{fontSize:20,transition:"transform 0.3s",transform:showInsInfo?"rotate(90deg)":"rotate(0deg)"}}>▸</span>
              What's the difference?
            </button>
            {showInsInfo&&(
              <div style={{background:C.card,borderRadius:16,padding:22,border:`1px solid ${C.border}`,boxShadow:C.shadow,animation:"fadeUp 0.3s ease-out",marginTop:12}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
                  <div style={{textAlign:"center"}}><div style={{background:"#EDEBE7",borderRadius:12,padding:"20px 12px",marginBottom:10}}><div style={{width:"70%",height:10,background:"#BBB",margin:"0 auto",borderRadius:5,boxShadow:"inset 0 1px 2px rgba(0,0,0,0.1)"}}/></div><div style={{fontSize:14,fontWeight:700}}>Standard</div><div style={{fontSize:12,color:C.dim}}>Single layer of steel</div></div>
                  <div style={{textAlign:"center"}}><div style={{background:C.accentSoft,borderRadius:12,padding:"20px 12px",marginBottom:10,border:`1px solid ${C.accent}33`}}><div style={{display:"flex",flexDirection:"column",gap:3,alignItems:"center"}}><div style={{width:"70%",height:5,background:"#7BAE7E",borderRadius:3}}/><div style={{width:"70%",height:8,background:"#A8D4AB",borderRadius:4,boxShadow:"inset 0 1px 2px rgba(0,0,0,0.05)"}}/><div style={{width:"70%",height:5,background:"#7BAE7E",borderRadius:3}}/></div></div><div style={{fontSize:14,fontWeight:700,color:C.accent}}>Insulated</div><div style={{fontSize:12,color:C.dim}}>3-layer sandwich</div></div>
                </div>
                <div style={{marginBottom:20}}>
                  {[{icon:"💪",text:"Stronger and more durable — resists dents"},{icon:"🤫",text:"Quieter — less noise opening and closing"},{icon:"🌡️",text:"Helps with temperature — keeps heat and cold out"}].map((b,i)=>(<div key={i} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"8px 0"}}><span style={{fontSize:16,flexShrink:0}}>{b.icon}</span><span style={{fontSize:14,color:C.text,lineHeight:1.4}}>{b.text}</span></div>))}
                </div>
                <div style={{fontSize:13,color:C.dim,lineHeight:1.5,padding:"6px 0 4px",fontStyle:"italic",borderTop:`1px solid ${C.border}`,marginTop:4}}>A basic non-insulated door can flex or dent more easily over time.</div>
                <div style={{background:C.bg,borderRadius:12,padding:16,marginBottom:14,marginTop:16}}>
                  <div style={{fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",color:C.dim,marginBottom:6}}>Insulation levels (R-value)</div>
                  <div style={{fontSize:13,color:C.dim,lineHeight:1.4,marginBottom:12}}>Higher R-value = more insulation. In Colorado's climate, R-12 handles most homes well.</div>
                  {[{level:"R-6",label:"Basic",desc:"Entry-level insulation",bar:25,color:C.border},{level:"R-12",label:"Best Value",desc:"Most popular choice",bar:60,color:C.accent,highlight:true},{level:"R-18",label:"Maximum",desc:"Extreme climates only",bar:90,color:C.dim}].map((tier,i)=>(<div key={i} style={{padding:"10px 0",borderBottom:i<2?`1px solid ${C.border}`:"none"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}><div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:14,fontWeight:700,color:tier.highlight?C.accent:C.text}}>{tier.level}</span><span style={{fontSize:13,fontWeight:500,color:tier.highlight?C.accent:C.dim}}>{tier.label}</span>{tier.highlight&&<span style={ss.tag(C.accent)}>Popular</span>}</div></div><div style={{height:6,borderRadius:3,background:"#E0DCD6",overflow:"hidden",marginBottom:3}}><div style={{height:"100%",width:`${tier.bar}%`,background:tier.color,borderRadius:3,transition:"width 0.5s ease"}}/></div><div style={{fontSize:12,color:C.dim}}>{tier.desc}</div></div>))}
                </div>
                <div style={{fontSize:14,color:C.accent,lineHeight:1.5,textAlign:"center",fontWeight:500}}>Most homeowners choose the middle option for the best balance of comfort and value.</div>
              </div>
            )}
          </div>
        );

      case "color":
        return (
          <div style={{ ...SCREEN_STYLE, padding:"20px 22px 132px" }}>
            <h2 style={{ ...ss.h2, marginBottom:4 }}>Pick a color</h2>
            <p style={{ ...ss.sub, marginBottom:12 }}>Tap any color to preview it on your door.</p>
            <div style={{textAlign:"center",marginBottom:8,fontSize:15,fontWeight:600,color:C.accent,transition:"all 0.3s"}}>Selected: {sel.colorName}</div>
            <div style={{marginBottom:12}} key={`preview-${colorPulse}`}>
              <HousePreview doorStyle={sel.style} doorColor={sel.color} doorWindows={sel.windows} photoURL={photoURL} size={sel.size}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:8}}>
              {DOOR_COLORS.map(c=>{const active=sel.color===c.hex;return(
                <button key={c.id} onClick={()=>{setSel(p=>({...p,color:c.hex,colorName:c.name}));setColorPulse(p=>p+1);}} style={{padding:10,borderRadius:14,cursor:"pointer",border:active?`3px solid ${C.accent}`:`2px solid ${C.border}`,background:active?C.accentSoft:C.card,boxShadow:active?`0 0 0 3px ${C.accentSoft}`:C.shadow,transition:"all 0.2s cubic-bezier(0.25,0.1,0.25,1)",transform:active?"scale(1.04)":"scale(1)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,WebkitTapHighlightColor:"transparent"}}>
                  <div style={{width:40,height:40,borderRadius:12,background:c.hex,border:c.hex==="#F0EDE8"?"1px solid #ddd":"1px solid transparent",boxShadow:"inset 0 1px 3px rgba(0,0,0,0.12)",transition:"transform 0.2s"}}/>
                  <span style={{fontSize:10,fontWeight:active?700:600,color:active?C.accent:C.dim,textAlign:"center",lineHeight:1.2}}>{c.name}</span>
                </button>
              );})}
            </div>
            <div style={{position:"sticky",bottom:12,marginTop:14,paddingTop:10,background:"linear-gradient(to bottom, rgba(246,241,235,0), rgba(246,241,235,0.92) 28%, rgba(246,241,235,1) 100%)"}}>
              <button style={{...ss.btn,...ss.pri,marginTop:0,marginBottom:0}} onClick={next}>Continue with this color →</button>
            </div>
          </div>
        );

      case "final": {
        const styleName=STYLES.find(s2=>s2.id===sel.style)?.name||sel.style;
        return (
          <div style={SCREEN_STYLE}>
            <h2 style={{...ss.h2,textAlign:"center",marginBottom:4}}>This looks great on your home</h2>
            <p style={{...ss.sub,textAlign:"center"}}>We'll confirm details and get this scheduled.</p>
            <div style={{marginBottom:20}}>
              <HousePreview doorStyle={sel.style} doorColor={sel.color} doorWindows={sel.windows} photoURL={photoURL} size={sel.size}/>
            </div>
            <div style={{background:C.card,borderRadius:16,padding:"20px 24px",boxShadow:C.shadow,border:`1px solid ${C.border}`,marginBottom:20}}>
              <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:C.dim,marginBottom:14}}>Your Selection</div>
              {[["Style",styleName],["Size",sel.size==="double"?"Double car":"Single car"],["Windows",sel.windows?"Yes":"No"],["Insulation",sel.insulation==="yes"?"Insulated":sel.insulation==="no"?"Standard":"TBD"],["Color",sel.colorName]].map(([k,v],i,a)=>(
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"11px 0",borderBottom:i<a.length-1?`1px solid ${C.border}`:"none",fontSize:15}}>
                  <span style={{color:C.dim}}>{k}</span><span style={{fontWeight:600}}>{v}</span>
                </div>
              ))}
            </div>
            <button style={{...ss.btn,...ss.pri}} onClick={next}>Send this design to Mary Anne →</button>
          </div>
        );
      }

      case "contact":
        return (
          <div style={SCREEN_STYLE}>
            <h2 style={ss.h2}>How do you want to do this?</h2>
            <p style={ss.sub}>Pick whichever is easier for you right now.</p>
            <button onClick={()=>setContactMode("phone")} style={{...ss.card,flexDirection:"column",alignItems:"flex-start",padding:"22px 24px",border:contactMode==="phone"?`2.5px solid ${C.accent}`:`2px solid ${C.border}`,background:contactMode==="phone"?C.accentSoft:C.card}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}><span style={{fontSize:24}}>📞</span><span style={{fontSize:17,fontWeight:700}}>I'm on the phone right now</span></div>
              <span style={{fontSize:13,color:C.dim,marginLeft:34}}>We'll send this directly to Mary Anne</span>
            </button>
            <button onClick={()=>setContactMode("text")} style={{...ss.card,flexDirection:"column",alignItems:"flex-start",padding:"22px 24px",border:contactMode==="text"?`2.5px solid ${C.accent}`:`2px solid ${C.border}`,background:contactMode==="text"?C.accentSoft:C.card}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}><span style={{fontSize:24}}>💬</span><span style={{fontSize:17,fontWeight:700}}>Text me about this door</span></div>
              <span style={{fontSize:13,color:C.dim,marginLeft:34}}>We'll follow up with your design</span>
            </button>
            {contactMode&&(
              <div style={{marginTop:8}}>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:13,fontWeight:600,color:C.dim,display:"block",marginBottom:6}}>
                    {contactMode==="phone"?<>Your phone number <span style={{fontWeight:400,opacity:0.7}}>(so we can confirm next steps)</span></>:"Phone number"}
                  </label>
                  <input type="tel" placeholder="(303) 555-1234" value={phone} onChange={e=>setPhone(e.target.value)} style={ss.input} onFocus={e=>(e.target.style.borderColor=C.accent)} onBlur={e=>(e.target.style.borderColor=C.border)}/>
                </div>
                <div style={{marginBottom:14}}>
                  <label style={{fontSize:13,fontWeight:600,color:C.dim,display:"block",marginBottom:6}}>Name <span style={{fontWeight:400,opacity:0.7}}>(optional)</span></label>
                  <input type="text" placeholder="First name" value={name} onChange={e=>setName(e.target.value)} style={ss.input} onFocus={e=>(e.target.style.borderColor=C.accent)} onBlur={e=>(e.target.style.borderColor=C.border)}/>
                </div>
                {contactMode==="text"&&(
                  <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 16px",background:C.warmSoft,borderRadius:12,fontSize:13,color:C.warm}}>
                    <span>🔒</span> No spam — just one text about your door.
                  </div>
                )}
              </div>
            )}
            <button style={{...ss.btn,...ss.pri,marginTop:16,opacity:contactMode&&phone?1:0.4}} disabled={!contactMode||!phone} onClick={next}>{contactCtaLabel}</button>
          </div>
        );

      case "confirm":
        return (
          <div style={SCREEN_STYLE}>
            <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
              {sent?(
                <>
                  <div style={{width:80,height:80,borderRadius:"50%",background:C.accentSoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:38,marginBottom:20,animation:"pop 0.4s ease-out"}}>✓</div>
                  <h2 style={{...ss.h2,textAlign:"center"}}>Sent!</h2>
                  <p style={ss.sub}>Mary Anne has your selections.</p>
                </>
              ):(
                <>
                  <h2 style={{...ss.h2,textAlign:"center",marginBottom:12}}>Ready to send?</h2>
                  <p style={{...ss.sub,marginBottom:40}}>Hold the button to send your door selections{contactMode==="phone"?" directly to Mary Anne":""}.</p>
                  <div onMouseDown={()=>setHolding(true)} onMouseUp={()=>setHolding(false)} onMouseLeave={()=>setHolding(false)} onTouchStart={e=>{e.preventDefault();setHolding(true);}} onTouchEnd={()=>setHolding(false)} style={{position:"relative",width:"100%",maxWidth:340,height:80,borderRadius:40,overflow:"hidden",cursor:"pointer",background:"#ABA69E",userSelect:"none",boxShadow:holding?`0 0 0 8px rgba(74,140,101,0.25), 0 0 40px rgba(74,140,101,0.4), 0 8px 24px rgba(0,0,0,0.2)`:`0 4px 20px rgba(0,0,0,0.12)`,transition:"box-shadow 0.3s, transform 0.2s",transform:holding?"scale(1.03)":"scale(1)"}}>
                    <div style={{position:"absolute",inset:0,borderRadius:40,background:`linear-gradient(90deg, #2A6B42, ${C.accentGlow}, #4CAF68)`,width:`${holdProg*100}%`,transition:holding?"none":"width 0.3s ease-out"}}/>
                    <div style={{position:"relative",zIndex:1,height:"100%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,fontWeight:800,color:"#fff",textShadow:holdProg>0.5?"none":"0 1px 3px rgba(0,0,0,0.3)",letterSpacing:"0.01em"}}>
                      {holding?(holdProg>0.8?"Almost there…":"Keep holding…"):"Hold to send this to Mary Anne"}
                    </div>
                  </div>
                  <p style={{fontSize:12,color:C.dim,marginTop:14}}>Press and hold for ~2 seconds</p>
                </>
              )}
            </div>
          </div>
        );

      case "done":
        return (
          <div style={SCREEN_STYLE}>
            <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
              <div style={{width:72,height:72,borderRadius:"50%",background:C.accentSoft,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:20,animation:"pop 0.4s ease-out"}}>🎉</div>
              <h2 style={{...ss.h2,textAlign:"center"}}>Perfect. We'll take it from here.</h2>
              <p style={{...ss.sub,textAlign:"center",maxWidth:300}}>We'll confirm details and schedule your install. Expect to hear from us shortly{name?`, ${name}`:""}.</p>
              <div style={{width:"100%",marginTop:12}}>
                <HousePreview doorStyle={sel.style} doorColor={sel.color} doorWindows={sel.windows} photoURL={photoURL} size={sel.size}/>
              </div>
              <div style={{marginTop:24,padding:"16px 22px",background:C.warmSoft,borderRadius:14,fontSize:15,color:C.warm,lineHeight:1.5,width:"100%"}}>📞 Questions? Just give us a call — we're happy to help.</div>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div style={ss.wrap}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pop { 0% { transform: scale(0.4); opacity: 0; } 60% { transform: scale(1.14); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes doorReveal { 0% { opacity: 0; transform: scale(0.94); } 40% { opacity: 1; } 100% { transform: scale(1); } }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        * { box-sizing: border-box; }
        input:focus { outline: none; }
        button:active { transform: scale(0.97); }
      `}</style>
      {step>0&&current!=="done"&&(
        <div style={ss.prog}>
          <div style={ss.track}><div style={ss.fill}/></div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.dim,marginTop:5}}>
            <span>{current==="confirm"?"Almost done!":`Step ${step}`}</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}
      {render()}
      {step>0&&current!=="done"&&current!=="hero"&&(
        <button style={ss.backBtn} onClick={back}>←</button>
      )}
    </div>
  );
}
