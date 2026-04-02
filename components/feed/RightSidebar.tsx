export default function RightSidebar() {
  const onlineFriends = [
    { name: 'Steve Jobs', title: 'CEO of Apple', img: 'people1.png', online: false, time: '5 minute ago' },
    { name: 'Ryan Roslansky', title: 'CEO of Linkedin', img: 'people2.png', online: true },
    { name: 'Dylan Field', title: 'CEO of Figma', img: 'people3.png', online: true },
  ]

  return (
    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
      <div className="_feed_right_sidebar py-3">
        <div className="_feed_right_inner_area _b_radious6 _padd_t24 _padd_b24 _padd_r24 _padd_l24 _feed_inner_area">
          <div className="_feed_right_inner_area_content _mar_b24">
            <h4 className="_feed_right_inner_area_title _title5">Online Friends</h4>
          </div>
          <div className="_feed_right_inner_area_card">
            {onlineFriends.map(friend => (
              <div
                key={friend.name}
                className={`_feed_right_inner_area_card_ppl ${!friend.online ? '_feed_right_inner_area_card_ppl_inactive' : ''}`}
              >
                <div className="_feed_right_inner_area_card_ppl_box">
                  <div className="_feed_right_inner_area_card_ppl_image">
                    <a href="#">
                      <img src={`/assets/images/${friend.img}`} alt="" className="_box_ppl_img" />
                    </a>
                  </div>
                  <div className="_feed_right_inner_area_card_ppl_txt">
                    <a href="#">
                      <h4 className="_feed_right_inner_area_card_ppl_title">{friend.name}</h4>
                    </a>
                    <p className="_feed_right_inner_area_card_ppl_para">{friend.title}</p>
                  </div>
                </div>
                <div className="_feed_right_inner_area_card_ppl_side">
                  {friend.online ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
                      <rect width="12" height="12" x="1" y="1" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="6" />
                    </svg>
                  ) : (
                    <span>{friend.time}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}