import{a as L,j as r}from"./emotion-react-jsx-runtime.browser.esm-DPXhOesS.js";import{R as e}from"./index-Czi_ZAC7.js";import"./index-DXragnAo.js";import"./index-DRjF_FHU.js";import{c as x}from"./emotion-react.browser.esm-D073MxVP.js";import"./jsx-runtime-DiklIkkE.js";const W={title:"Components/Buttons/RoundButton",component:e,tags:["autodocs"],argTypes:{variant:{control:"radio",options:["primary","kakao"]},size:{control:"radio",options:["XS","S","M","L","XL"]},fullWidth:{control:"boolean"},disabled:{control:"boolean"}}},o={args:{children:"Daengle"}},t={args:{disabled:!0,children:"Daengle"}},s={args:{fullWidth:!0,children:"Daengle"}};function n(){return L("div",{css:v,children:[r(e,{size:"XS",children:"XS xsmall"}),r(e,{size:"S",children:"S small"}),r(e,{size:"M",children:"M medium"}),r(e,{size:"L",children:"L large"}),r(e,{size:"XL",children:"XL xlarge"})]})}function a(){return L("div",{css:v,children:[r(e,{variant:"primary",children:"Daengle"}),r(e,{variant:"kakao",size:"L",children:"카카오로 로그인하기"})]})}const v=x`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;n.__docgenInfo={description:"",methods:[],displayName:"Size"};a.__docgenInfo={description:"",methods:[],displayName:"Variant"};var i,d,c;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    children: 'Daengle'
  }
}`,...(c=(d=o.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var u,l,m;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Daengle'
  }
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var p,g,h;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    fullWidth: true,
    children: 'Daengle'
  }
}`,...(h=(g=s.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var S,f,z;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`function Size() {
  return <div css={wrapper}>
      <RoundButton size="XS">XS xsmall</RoundButton>
      <RoundButton size="S">S small</RoundButton>
      <RoundButton size="M">M medium</RoundButton>
      <RoundButton size="L">L large</RoundButton>
      <RoundButton size="XL">XL xlarge</RoundButton>
    </div>;
}`,...(z=(f=n.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};var B,R,D;a.parameters={...a.parameters,docs:{...(B=a.parameters)==null?void 0:B.docs,source:{originalSource:`function Variant() {
  return <div css={wrapper}>
      <RoundButton variant="primary">Daengle</RoundButton>
      <RoundButton variant="kakao" size="L">
        카카오로 로그인하기
      </RoundButton>
    </div>;
}`,...(D=(R=a.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};const V=["Default","Disabled","FullWidth","Size","Variant"];export{o as Default,t as Disabled,s as FullWidth,n as Size,a as Variant,V as __namedExportsOrder,W as default};
