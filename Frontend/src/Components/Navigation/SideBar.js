import React from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { arr } from './sidebar_data';

const SideBar = ({ openSidebar, closeSidebar, handleClose }) => {


  return <div className={`sidebar shadow-lg animate__animated ${openSidebar ? 'animate__fadeInLeft animate__faster' : 'd-none'} 
  ${closeSidebar ? 'animate__fadeOutLeft animate__faster' : null}`}>
    <article className='sidebar--top'>
      <h2>E-appointment</h2>
      <h2><FaWindowClose className='close--icon' onClick={() => handleClose(200)} /></h2>
    </article>
    <main className='sidebar--list'>
      <ul>
        {
          arr && arr.map((items, i) => {
            let { header, sub_list, icon } = items;
            return <section key={i}>
              <li className='items'> {icon} &nbsp; {header} </li>
              {sub_list && sub_list.map((item, i) => {
                let { name, route } = item;
                return <ol className='items--list' key={i}>
                  <NavLink className="lists" onClick={() => handleClose(500)} to={route}>{name}</NavLink>
                </ol>
              })}
            </section>
          })
        }
      </ul>
    </main>
  </div>;
};

export default SideBar;
