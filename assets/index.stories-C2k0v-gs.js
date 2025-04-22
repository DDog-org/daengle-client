import{j as a}from"./emotion-react-jsx-runtime.browser.esm-DPXhOesS.js";import{r as o}from"./index-DRjF_FHU.js";import{e as d}from"./index-Czi_ZAC7.js";import"./index-DXragnAo.js";import{c as C}from"./emotion-react.browser.esm-D073MxVP.js";import"./jsx-runtime-DiklIkkE.js";const T={title:"Components/Chips/ChipRadioGroup",component:d,tags:["autodocs"]},s=[{value:"1",label:"#소형견"},{value:"2",label:"#중형견"},{value:"3",label:"#대형견"},{value:"4",label:"#노견"},{value:"5",label:"#입질"},{value:"6",label:"#검많은"},{value:"7",label:"#활동량많은"}];function r(){var l;const[t,i]=o.useState(((l=s[0])==null?void 0:l.value)??"");return a("div",{css:n,children:s.map(e=>a(d,{label:e.label,value:e.value,isSelected:t===e.value,onChange:()=>i(e.value),size:"fluid"},e.value))})}function u(){var l;const[t,i]=o.useState(((l=s[0])==null?void 0:l.value)??"");return a("div",{css:n,children:s.map(e=>a(d,{label:e.label,value:e.value,isSelected:t===e.value,onChange:()=>i(e.value),size:"fixed"}))})}function c(){var l;const[t,i]=o.useState(((l=s[0])==null?void 0:l.value)??"");return a("div",{css:n,children:s.slice(2).map(e=>a(d,{label:e.label,value:e.value,isSelected:t===e.value,onChange:()=>i(e.value),size:"full"}))})}const n=C`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  width: 100%;
`;r.__docgenInfo={description:"",methods:[],displayName:"Fluid"};u.__docgenInfo={description:"",methods:[],displayName:"Fixed"};c.__docgenInfo={description:"",methods:[],displayName:"Full"};var p,v,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`function Fluid() {
  const [selected, setSelected] = useState<string | number>(ITEMS[0]?.value ?? '');
  return <div css={wrapper}>
      {ITEMS.map(item => <ChipRadio key={item.value} label={item.label} value={item.value} isSelected={selected === item.value} onChange={() => setSelected(item.value)} size="fluid" />)}
    </div>;
}`,...(m=(v=r.parameters)==null?void 0:v.docs)==null?void 0:m.source}}};var S,b,f;u.parameters={...u.parameters,docs:{...(S=u.parameters)==null?void 0:S.docs,source:{originalSource:`function Fixed() {
  const [selected, setSelected] = useState<string | number>(ITEMS[0]?.value ?? '');
  return <div css={wrapper}>
      {ITEMS.map(item => <ChipRadio label={item.label} value={item.value} isSelected={selected === item.value} onChange={() => setSelected(item.value)} size="fixed" />)}
    </div>;
}`,...(f=(b=u.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var h,g,x;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:`function Full() {
  const [selected, setSelected] = useState<string | number>(ITEMS[0]?.value ?? '');
  return <div css={wrapper}>
      {ITEMS.slice(2).map(item => <ChipRadio label={item.label} value={item.value} isSelected={selected === item.value} onChange={() => setSelected(item.value)} size="full" />)}
    </div>;
}`,...(x=(g=c.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const z=["Fluid","Fixed","Full"];export{u as Fixed,r as Fluid,c as Full,z as __namedExportsOrder,T as default};
