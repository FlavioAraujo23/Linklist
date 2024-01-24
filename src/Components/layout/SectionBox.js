export default function SectionBox({children}) {
  return (
    <div className='bg-white m-8 shadow' style={{padding: "1rem"}}>
      {children}
    </div>
  );
}