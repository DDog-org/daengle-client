import{j as r}from"./emotion-react-jsx-runtime.browser.esm-DPXhOesS.js";import{f as a}from"./index-Czi_ZAC7.js";import"./index-DXragnAo.js";import"./index-DRjF_FHU.js";import{c as F}from"./emotion-react.browser.esm-D073MxVP.js";import"./jsx-runtime-DiklIkkE.js";const z={title:"Components/Chips/ChipToggleButton",component:a,tags:["autodocs"]},n=["없음","눈","코","입","귀","목","몸통","다리","꼬리","생식기"],s=()=>r("div",{css:d,children:n.map(e=>r(a,{size:"fixed",children:e},e))}),o=()=>r("div",{css:d,children:n.map(e=>r(a,{size:"fluid",children:e},e))}),i=()=>r("div",{css:d,children:n.map(e=>r(a,{size:"full",children:e},e))}),t={args:{disabled:!0,children:"Daengle"}},d=F`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;s.__docgenInfo={description:"",methods:[],displayName:"Fixed"};o.__docgenInfo={description:"",methods:[],displayName:"Fluid"};i.__docgenInfo={description:"",methods:[],displayName:"Full"};var p,c,l;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  return <div css={wrapper}>
      {ITEMS.map(item => <ChipToggleButton key={item} size="fixed">
          {item}
        </ChipToggleButton>)}
    </div>;
}`,...(l=(c=s.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var m,u,g;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`() => {
  return <div css={wrapper}>
      {ITEMS.map(item => <ChipToggleButton key={item} size="fluid">
          {item}
        </ChipToggleButton>)}
    </div>;
}`,...(g=(u=o.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var h,f,T;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`() => {
  return <div css={wrapper}>
      {ITEMS.map(item => <ChipToggleButton key={item} size="full">
          {item}
        </ChipToggleButton>)}
    </div>;
}`,...(T=(f=i.parameters)==null?void 0:f.docs)==null?void 0:T.source}}};var x,C,v;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Daengle'
  }
}`,...(v=(C=t.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};const E=["Fixed","Fluid","Full","Disabled"];export{t as Disabled,s as Fixed,o as Fluid,i as Full,E as __namedExportsOrder,z as default};
