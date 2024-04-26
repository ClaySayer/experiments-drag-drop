import Link from "./Link"
import './SideBar.css'

function SideBar(){
  const links = [
    {label: 'Home', path: '/' },
    {label: 'Resizable Grid', path: '/grid'},
    {label: 'Resizable', path: '/resizable'}
  ]

  const renderedLinks = links.map((link)=>{
    const {label, path} = link
    return(
        <Link
          key={label}
          className="link" 
          to={path}
          activeClassName="font-bold border-l-4 border-blue-500 pl-2"
          >{label}</Link>
    )
  })

  return(
    <div className="side-bar">
      {renderedLinks}
    </div>
  )
}

export default SideBar