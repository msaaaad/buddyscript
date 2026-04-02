export default function LeftSidebar() {
  return (
    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
      <div className="_layout_left_sidebar">
        <div className="_layout_left_sidebar_wrap">
          <div className="_left_inner_area _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
            <ul className="_left_inner_area_explore_list">
              <li className="_left_inner_area_explore_item">
                <a href="#" className="_left_inner_area_explore_link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" fill="none" viewBox="0 0 26 20">
                    <path fill="#666" fillRule="evenodd" d="M12.79 12.15h.429c2.268.015 7.45.243 7.45 3.732 0 3.466-5.002 3.692-7.415 3.707h-.894c-2.268-.015-7.452-.243-7.452-3.727 0-3.47 5.184-3.697 7.452-3.711l.297-.001h.132zm9.343-2.224c2.846.424 3.444 1.751 3.444 2.79 0 .636-.251 1.794-1.931 2.43a.882.882 0 01-1.137-.506.873.873 0 01.51-1.13c.796-.3.796-.633.796-.793 0-.511-.654-.868-1.944-1.06a.878.878 0 01-.741-.996.886.886 0 011.003-.735zM12.789 0c2.96 0 5.368 2.392 5.368 5.33 0 2.94-2.407 5.331-5.368 5.331h-.031a5.329 5.329 0 01-3.782-1.57 5.253 5.253 0 01-1.553-3.764C7.423 2.392 9.83 0 12.789 0z" clipRule="evenodd" />
                  </svg>
                  Find friends
                </a>
              </li>
              <li className="_left_inner_area_explore_item">
                <a href="#" className="_left_inner_area_explore_link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                    <path fill="#666" d="M13.704 2c2.8 0 4.585 1.435 4.585 4.258V20.33c0 .443-.157.867-.436 1.18-.279.313-.658.489-1.063.489a1.456 1.456 0 01-.708-.203l-5.132-3.134-5.112 3.14c-.615.36-1.361.194-1.829-.405l-.09-.126-.085-.155a1.913 1.913 0 01-.176-.786V6.434C3.658 3.5 5.404 2 8.243 2h5.46z" />
                  </svg>
                  Bookmarks
                </a>
              </li>
              <li className="_left_inner_area_explore_item">
                <a href="#" className="_left_inner_area_explore_link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  Group
                </a>
              </li>
              <li className="_left_inner_area_explore_item _explore_item">
                <a href="#" className="_left_inner_area_explore_link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                    <path fill="#666" d="M7.625 2c.315-.015.642.306.645.69.003.309.234.558.515.558h.928c1.317 0 2.402 1.169 2.419 2.616v.24h2.604c2.911-.026 5.255 2.337 5.377 5.414.005.12.006.245.004.368v4.31c.062 3.108-2.21 5.704-5.064 5.773-.117.003-.228 0-.34-.005a199.325 199.325 0 01-7.516 0c-2.816.132-5.238-2.292-5.363-5.411a6.262 6.262 0 01-.004-.371V11.87c-.03-1.497.48-2.931 1.438-4.024.956-1.094 2.245-1.714 3.629-1.746z" />
                  </svg>
                  Gaming
                </a>
                <span className="_left_inner_area_explore_link_txt">New</span>
              </li>
              <li className="_left_inner_area_explore_item">
                <a href="#" className="_left_inner_area_explore_link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="#666" d="M12.616 2c.71 0 1.388.28 1.882.779.495.498.762 1.17.74 1.799l.009.147c.017.146.065.286.144.416.152.255.402.44.695.514.292.074.602.032.896-.137l.164-.082c1.23-.567 2.705-.117 3.387 1.043l.613 1.043c.017.027.03.056.043.085l.057.111a2.537 2.537 0 01-.884 3.204l-.257.159a1.102 1.102 0 00-.447 1.203c.078.287.27.53.56.695l.166.105c.505.346.869.855 1.028 1.439.18.659.083 1.36-.272 1.957l-.66 1.077-.1.152c-.774 1.092-2.279 1.425-3.427.776l-.136-.069a1.19 1.19 0 00-.435-.1 1.128 1.128 0 00-1.143 1.154l-.008.171C15.12 20.971 13.985 22 12.616 22h-1.235c-1.449 0-2.623-1.15-2.622-2.525l-.008-.147a1.066 1.066 0 00-.836-.941c-.29-.076-.6-.035-.9.134l-.177.087a2.674 2.674 0 01-1.794.129 2.606 2.606 0 01-1.57-1.215l-.637-1.078-.085-.16a2.527 2.527 0 011.03-3.296l.104-.065c.309-.21.494-.554.494-.923 0-.401-.219-.772-.6-.989l-.156-.097a2.542 2.542 0 01-.764-3.407l.65-1.045a2.646 2.646 0 013.552-.96l.134.07c.135.06.283.093.425.094.626 0 1.137-.492 1.146-1.124l.009-.194a2.54 2.54 0 01.752-1.593A2.642 2.642 0 0111.381 2h1.235z" />
                  </svg>
                  Settings
                </a>
              </li>
              <li className="_left_inner_area_explore_item">
                <a href="#" className="_left_inner_area_explore_link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                  Save post
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="_layout_left_sidebar_inner">
          <div className="_left_inner_area_suggest _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
            <div className="_left_inner_area_suggest_content _mar_b24">
              <h4 className="_left_inner_area_suggest_content_title _title5">Suggested People</h4>
              <span className="_left_inner_area_suggest_content_txt">
                <a className="_left_inner_area_suggest_content_txt_link" href="#">See All</a>
              </span>
            </div>
            {[
              { name: 'Steve Jobs', title: 'CEO of Apple', img: 'people1.png' },
              { name: 'Ryan Roslansky', title: 'CEO of Linkedin', img: 'people2.png' },
              { name: 'Dylan Field', title: 'CEO of Figma', img: 'people3.png' },
            ].map(person => (
              <div className="_left_inner_area_suggest_info" key={person.name}>
                <div className="_left_inner_area_suggest_info_box">
                  <div className="_left_inner_area_suggest_info_image">
                    <a href="#">
                      <img src={`/assets/images/${person.img}`} alt="Image" className="_info_img" />
                    </a>
                  </div>
                  <div className="_left_inner_area_suggest_info_txt">
                    <a href="#">
                      <h4 className="_left_inner_area_suggest_info_title">{person.name}</h4>
                    </a>
                    <p className="_left_inner_area_suggest_info_para">{person.title}</p>
                  </div>
                </div>
                <div className="_left_inner_area_suggest_info_link">
                  <a href="#" className="_info_link">Connect</a>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="_layout_left_sidebar_inner">
          <div className="_left_inner_area_event _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
            <div className="_left_inner_event_content">
              <h4 className="_left_inner_event_title _title5">Events</h4>
              <a href="#" className="_left_inner_event_link">See all</a>
            </div>
            {[1, 2].map(i => (
              <a className="_left_inner_event_card_link" href="#" key={i}>
                <div className="_left_inner_event_card">
                  <div className="_left_inner_event_card_iamge">
                    <img src="/assets/images/feed_event1.png" alt="Image" className="_card_img" />
                  </div>
                  <div className="_left_inner_event_card_content">
                    <div className="_left_inner_card_date">
                      <p className="_left_inner_card_date_para">10</p>
                      <p className="_left_inner_card_date_para1">Jul</p>
                    </div>
                    <div className="_left_inner_card_txt">
                      <h4 className="_left_inner_event_card_title">No more terrorism no more cry</h4>
                    </div>
                  </div>
                  <hr className="_underline" />
                  <div className="_left_inner_event_bottom">
                    <p className="_left_iner_event_bottom">17 People Going</p>
                    <a href="#" className="_left_iner_event_bottom_link">Going</a>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}