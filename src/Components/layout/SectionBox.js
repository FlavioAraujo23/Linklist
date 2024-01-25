export default function SectionBox({children}) {
  return (
    <div className='bg-white shadow' style={{padding: "1rem", margin:'2rem'}}>
      {children}
    </div>
  );
}