import Image from 'next/image';
function Header() {
  return (
    <div>
      <Image src="icons/header_arrow.svg" alt="뒤로가기 아이콘" width={24} height={12} />
    </div>
  );
}

export default Header;
