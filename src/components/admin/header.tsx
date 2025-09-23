import { Head } from './head';

export function Header() {
  return (
    <>
      <div className='nav-header'>
        <a
          href='index.html'
          className='brand-logo'
        >
          <img
            className='logo-abbr'
            src='./images/logo.png'
            alt=''
          />
          <img
            className='logo-compact'
            src='./images/logo-text.png'
            alt=''
          />
          <img
            className='brand-title'
            src='./images/logo-text.png'
            alt=''
          />
        </a>

        <div className='nav-control'>
          <div className='hamburger'>
            <span className='line'></span>
            <span className='line'></span>
            <span className='line'></span>
          </div>
        </div>
      </div>

      <div className='chatbox'>
        <div className='chatbox-close'></div>
        <div className='custom-tab-1'>
          <ul className='nav nav-tabs'>
            <li className='nav-item'>
              <a
                className='nav-link'
                data-toggle='tab'
                href='#notes'
              >
                Notes
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link'
                data-toggle='tab'
                href='#alerts'
              >
                Alerts
              </a>
            </li>
            <li className='nav-item'>
              <a
                className='nav-link active'
                data-toggle='tab'
                href='#chat'
              >
                Chat
              </a>
            </li>
          </ul>
          <div className='tab-content'>
            <div
              className='tab-pane fade active show'
              id='chat'
              role='tabpanel'
            >
              <div className='card mb-sm-3 mb-md-0 contacts_card dz-chat-user-box'>
                <div
                  className='card-body contacts_body p-0 dz-scroll  '
                  id='DZ_W_Contacts_Body'
                >
                  <ul className='contacts'>
                    <li className='name-first-letter'>A</li>
                    <li className='active dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/1.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon'></span>
                        </div>
                        <div className='user_info'>
                          <span>Archie Parker</span>
                          <p>Kalid is online</p>
                        </div>
                      </div>
                    </li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/2.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon offline'></span>
                        </div>
                        <div className='user_info'>
                          <span>Alfie Mason</span>
                          <p>Taherah left 7 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/3.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon'></span>
                        </div>
                        <div className='user_info'>
                          <span>AharlieKane</span>
                          <p>Sami is online</p>
                        </div>
                      </div>
                    </li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/4.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon offline'></span>
                        </div>
                        <div className='user_info'>
                          <span>Athan Jacoby</span>
                          <p>Nargis left 30 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li className='name-first-letter'>B</li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/5.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon offline'></span>
                        </div>
                        <div className='user_info'>
                          <span>Bashid Samim</span>
                          <p>Rashid left 50 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/1.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon'></span>
                        </div>
                        <div className='user_info'>
                          <span>Breddie Ronan</span>
                          <p>Kalid is online</p>
                        </div>
                      </div>
                    </li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/2.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon offline'></span>
                        </div>
                        <div className='user_info'>
                          <span>Ceorge Carson</span>
                          <p>Taherah left 7 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li className='name-first-letter'>D</li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/3.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon'></span>
                        </div>
                        <div className='user_info'>
                          <span>Darry Parker</span>
                          <p>Sami is online</p>
                        </div>
                      </div>
                    </li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/4.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon offline'></span>
                        </div>
                        <div className='user_info'>
                          <span>Denry Hunter</span>
                          <p>Nargis left 30 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li className='name-first-letter'>J</li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/5.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon offline'></span>
                        </div>
                        <div className='user_info'>
                          <span>Jack Ronan</span>
                          <p>Rashid left 50 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/1.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon'></span>
                        </div>
                        <div className='user_info'>
                          <span>Jacob Tucker</span>
                          <p>Kalid is online</p>
                        </div>
                      </div>
                    </li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/2.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon offline'></span>
                        </div>
                        <div className='user_info'>
                          <span>James Logan</span>
                          <p>Taherah left 7 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/3.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon'></span>
                        </div>
                        <div className='user_info'>
                          <span>Joshua Weston</span>
                          <p>Sami is online</p>
                        </div>
                      </div>
                    </li>
                    <li className='name-first-letter'>O</li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/4.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon offline'></span>
                        </div>
                        <div className='user_info'>
                          <span>Oliver Acker</span>
                          <p>Nargis left 30 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li className='dz-chat-user'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont'>
                          <img
                            src='images/avatar/5.jpg'
                            className='rounded-circle user_img'
                            alt=''
                          />
                          <span className='online_icon offline'></span>
                        </div>
                        <div className='user_info'>
                          <span>Oscar Weston</span>
                          <p>Rashid left 50 mins ago</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='card chat dz-chat-history-box d-none'>
                <div
                  className='card-body msg_card_body dz-scroll'
                  id='DZ_W_Contacts_Body3'
                >
                  <div className='d-flex justify-content-start mb-4'>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/1.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                    <div className='msg_cotainer'>
                      Hi, how are you samim?
                      <span className='msg_time'>8:40 AM, Today</span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end mb-4'>
                    <div className='msg_cotainer_send'>
                      Hi Khalid i am good tnx how about you?
                      <span className='msg_time_send'>8:55 AM, Today</span>
                    </div>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/2.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='d-flex justify-content-start mb-4'>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/1.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                    <div className='msg_cotainer'>
                      I am good too, thank you for your chat template
                      <span className='msg_time'>9:00 AM, Today</span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end mb-4'>
                    <div className='msg_cotainer_send'>
                      You are welcome
                      <span className='msg_time_send'>9:05 AM, Today</span>
                    </div>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/2.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='d-flex justify-content-start mb-4'>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/1.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                    <div className='msg_cotainer'>
                      I am looking for your next templates
                      <span className='msg_time'>9:07 AM, Today</span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end mb-4'>
                    <div className='msg_cotainer_send'>
                      Ok, thank you have a good day
                      <span className='msg_time_send'>9:10 AM, Today</span>
                    </div>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/2.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='d-flex justify-content-start mb-4'>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/1.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                    <div className='msg_cotainer'>
                      Bye, see you
                      <span className='msg_time'>9:12 AM, Today</span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-start mb-4'>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/1.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                    <div className='msg_cotainer'>
                      Hi, how are you samim?
                      <span className='msg_time'>8:40 AM, Today</span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end mb-4'>
                    <div className='msg_cotainer_send'>
                      Hi Khalid i am good tnx how about you?
                      <span className='msg_time_send'>8:55 AM, Today</span>
                    </div>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/2.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='d-flex justify-content-start mb-4'>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/1.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                    <div className='msg_cotainer'>
                      I am good too, thank you for your chat template
                      <span className='msg_time'>9:00 AM, Today</span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end mb-4'>
                    <div className='msg_cotainer_send'>
                      You are welcome
                      <span className='msg_time_send'>9:05 AM, Today</span>
                    </div>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/2.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='d-flex justify-content-start mb-4'>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/1.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                    <div className='msg_cotainer'>
                      I am looking for your next templates
                      <span className='msg_time'>9:07 AM, Today</span>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end mb-4'>
                    <div className='msg_cotainer_send'>
                      Ok, thank you have a good day
                      <span className='msg_time_send'>9:10 AM, Today</span>
                    </div>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/2.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='d-flex justify-content-start mb-4'>
                    <div className='img_cont_msg'>
                      <img
                        src='images/avatar/1.jpg'
                        className='rounded-circle user_img_msg'
                        alt=''
                      />
                    </div>
                    <div className='msg_cotainer'>
                      Bye, see you
                      <span className='msg_time'>9:12 AM, Today</span>
                    </div>
                  </div>
                </div>
                <div className='card-footer type_msg'>
                  <div className='input-group'>
                    <textarea
                      className='form-control'
                      placeholder='Type your message...'
                    ></textarea>
                    <div className='input-group-append'>
                      <button
                        type='button'
                        className='btn btn-primary'
                      >
                        <i className='fa fa-location-arrow'></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='tab-pane fade'
              id='alerts'
              role='tabpanel'
            >
              <div className='card mb-sm-3 mb-md-0 contacts_card'>
                <div
                  className='card-body contacts_body p-0 dz-scroll'
                  id='DZ_W_Contacts_Body1'
                >
                  <ul className='contacts'>
                    <li className='name-first-letter'>SEVER STATUS</li>
                    <li className='active'>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont primary'>KK</div>
                        <div className='user_info'>
                          <span>David Nester Birthday</span>
                          <p className='text-primary'>Today</p>
                        </div>
                      </div>
                    </li>
                    <li className='name-first-letter'>SOCIAL</li>
                    <li>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont success'>
                          RU<i className='icon fa-birthday-cake'></i>
                        </div>
                        <div className='user_info'>
                          <span>Perfection Simplified</span>
                          <p>Jame Smith commented on your status</p>
                        </div>
                      </div>
                    </li>
                    <li className='name-first-letter'>SEVER STATUS</li>
                    <li>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont primary'>
                          AU<i className='icon fa fa-user-plus'></i>
                        </div>
                        <div className='user_info'>
                          <span>AharlieKane</span>
                          <p>Sami is online</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className='d-flex bd-highlight'>
                        <div className='img_cont info'>
                          MO<i className='icon fa fa-user-plus'></i>
                        </div>
                        <div className='user_info'>
                          <span>Athan Jacoby</span>
                          <p>Nargis left 30 mins ago</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className='card-footer'></div>
              </div>
            </div>
            <div
              className='tab-pane fade'
              id='notes'
            >
              <div className='card mb-sm-3 mb-md-0 note_card'>
                <div
                  className='card-body contacts_body p-0 dz-scroll'
                  id='DZ_W_Contacts_Body2'
                >
                  <ul className='contacts'>
                    <li className='active'>
                      <div className='d-flex bd-highlight'>
                        <div className='user_info'>
                          <span>New order placed..</span>
                          <p>10 Aug 2020</p>
                        </div>
                        <div className='ml-auto'>
                          <a
                            href='javascript:void(0)'
                            className='btn btn-primary btn-xs sharp mr-1'
                          >
                            <i className='fa fa-pencil'></i>
                          </a>
                          <a
                            href='javascript:void(0)'
                            className='btn btn-danger btn-xs sharp'
                          >
                            <i className='fa fa-trash'></i>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className='d-flex bd-highlight'>
                        <div className='user_info'>
                          <span>Youtube, a video-sharing website..</span>
                          <p>10 Aug 2020</p>
                        </div>
                        <div className='ml-auto'>
                          <a
                            href='javascript:void(0)'
                            className='btn btn-primary btn-xs sharp mr-1'
                          >
                            <i className='fa fa-pencil'></i>
                          </a>
                          <a
                            href='javascript:void(0)'
                            className='btn btn-danger btn-xs sharp'
                          >
                            <i className='fa fa-trash'></i>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className='d-flex bd-highlight'>
                        <div className='user_info'>
                          <span>john just buy your product..</span>
                          <p>10 Aug 2020</p>
                        </div>
                        <div className='ml-auto'>
                          <a
                            href='javascript:void(0)'
                            className='btn btn-primary btn-xs sharp mr-1'
                          >
                            <i className='fa fa-pencil'></i>
                          </a>
                          <a
                            href='javascript:void(0)'
                            className='btn btn-danger btn-xs sharp'
                          >
                            <i className='fa fa-trash'></i>
                          </a>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className='d-flex bd-highlight'>
                        <div className='user_info'>
                          <span>Athan Jacoby</span>
                          <p>10 Aug 2020</p>
                        </div>
                        <div className='ml-auto'>
                          <a
                            href='javascript:void(0)'
                            className='btn btn-primary btn-xs sharp mr-1'
                          >
                            <i className='fa fa-pencil'></i>
                          </a>
                          <a
                            href='javascript:void(0)'
                            className='btn btn-danger btn-xs sharp'
                          >
                            <i className='fa fa-trash'></i>
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Header />

      <div className='deznav'>
        <div className='deznav-scroll'>
          <a
            href='javascript:void(0)'
            className='add-menu-sidebar'
            data-toggle='modal'
            data-target='#addOrderModalside'
          >
            + New Event
          </a>
          <ul
            className='metismenu'
            id='menu'
          >
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'
              >
                <i className='flaticon-381-networking'></i>
                <span className='nav-text'>Dashboard</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='index.html'>Dashboard</a>
                </li>
                <li>
                  <a href='event.html'>Event</a>
                </li>
                <li>
                  <a href='event-detail.html'>Event Detail</a>
                </li>
                <li>
                  <a href='customers.html'>Customers</a>
                </li>
                <li>
                  <a href='analytics.html'>Analytics</a>
                </li>
                <li>
                  <a href='reviews.html'>Reviews</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'
              >
                <i className='flaticon-381-television'></i>
                <span className='nav-text'>Apps</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='./app-profile.html'>Profile</a>
                </li>
                <li>
                  <a href='./post-details.html'>Post Details</a>
                </li>
                <li>
                  <a
                    className='has-arrow'
                    href='javascript:void()'
                    aria-expanded='false'
                  >
                    Email
                  </a>
                  <ul aria-expanded='false'>
                    <li>
                      <a href='./email-compose.html'>Compose</a>
                    </li>
                    <li>
                      <a href='./email-inbox.html'>Inbox</a>
                    </li>
                    <li>
                      <a href='./email-read.html'>Read</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href='./app-calender.html'>Calendar</a>
                </li>
                <li>
                  <a
                    className='has-arrow'
                    href='javascript:void()'
                    aria-expanded='false'
                  >
                    Shop
                  </a>
                  <ul aria-expanded='false'>
                    <li>
                      <a href='./ecom-product-grid.html'>Product Grid</a>
                    </li>
                    <li>
                      <a href='./ecom-product-list.html'>Product List</a>
                    </li>
                    <li>
                      <a href='./ecom-product-detail.html'>Product Details</a>
                    </li>
                    <li>
                      <a href='./ecom-product-order.html'>Order</a>
                    </li>
                    <li>
                      <a href='./ecom-checkout.html'>Checkout</a>
                    </li>
                    <li>
                      <a href='./ecom-invoice.html'>Invoice</a>
                    </li>
                    <li>
                      <a href='./ecom-customers.html'>Customers</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'
              >
                <i className='flaticon-381-controls-3'></i>
                <span className='nav-text'>Charts</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='./chart-flot.html'>Flot</a>
                </li>
                <li>
                  <a href='./chart-morris.html'>Morris</a>
                </li>
                <li>
                  <a href='./chart-chartjs.html'>Chartjs</a>
                </li>
                <li>
                  <a href='./chart-chartist.html'>Chartist</a>
                </li>
                <li>
                  <a href='./chart-sparkline.html'>Sparkline</a>
                </li>
                <li>
                  <a href='./chart-peity.html'>Peity</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'
              >
                <i className='flaticon-381-internet'></i>
                <span className='nav-text'>Bootstrap</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='./ui-accordion.html'>Accordion</a>
                </li>
                <li>
                  <a href='./ui-alert.html'>Alert</a>
                </li>
                <li>
                  <a href='./ui-badge.html'>Badge</a>
                </li>
                <li>
                  <a href='./ui-button.html'>Button</a>
                </li>
                <li>
                  <a href='./ui-modal.html'>Modal</a>
                </li>
                <li>
                  <a href='./ui-button-group.html'>Button Group</a>
                </li>
                <li>
                  <a href='./ui-list-group.html'>List Group</a>
                </li>
                <li>
                  <a href='./ui-media-object.html'>Media Object</a>
                </li>
                <li>
                  <a href='./ui-card.html'>Cards</a>
                </li>
                <li>
                  <a href='./ui-carousel.html'>Carousel</a>
                </li>
                <li>
                  <a href='./ui-dropdown.html'>Dropdown</a>
                </li>
                <li>
                  <a href='./ui-popover.html'>Popover</a>
                </li>
                <li>
                  <a href='./ui-progressbar.html'>Progressbar</a>
                </li>
                <li>
                  <a href='./ui-tab.html'>Tab</a>
                </li>
                <li>
                  <a href='./ui-typography.html'>Typography</a>
                </li>
                <li>
                  <a href='./ui-pagination.html'>Pagination</a>
                </li>
                <li>
                  <a href='./ui-grid.html'>Grid</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'
              >
                <i className='flaticon-381-heart'></i>
                <span className='nav-text'>Plugins</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='./uc-select2.html'>Select 2</a>
                </li>
                <li>
                  <a href='./uc-nestable.html'>Nestedable</a>
                </li>
                <li>
                  <a href='./uc-noui-slider.html'>Noui Slider</a>
                </li>
                <li>
                  <a href='./uc-sweetalert.html'>Sweet Alert</a>
                </li>
                <li>
                  <a href='./uc-toastr.html'>Toastr</a>
                </li>
                <li>
                  <a href='./map-jqvmap.html'>Jqv Map</a>
                </li>
                <li>
                  <a href='./uc-lightgallery.html'>Lightgallery</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href='widget-basic.html'
                className='ai-icon'
                aria-expanded='false'
              >
                <i className='flaticon-381-settings-2'></i>
                <span className='nav-text'>Widget</span>
              </a>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'
              >
                <i className='flaticon-381-notepad'></i>
                <span className='nav-text'>Forms</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='./form-element.html'>Form Elements</a>
                </li>
                <li>
                  <a href='./form-wizard.html'>Wizard</a>
                </li>
                <li>
                  <a href='./form-editor-summernote.html'>Summernote</a>
                </li>
                <li>
                  <a href='form-pickers.html'>Pickers</a>
                </li>
                <li>
                  <a href='form-validation-jquery.html'>Jquery Validate</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'
              >
                <i className='flaticon-381-network'></i>
                <span className='nav-text'>Table</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='table-bootstrap-basic.html'>Bootstrap</a>
                </li>
                <li>
                  <a href='table-datatable-basic.html'>Datatable</a>
                </li>
              </ul>
            </li>
            <li>
              <a
                className='has-arrow ai-icon'
                href='javascript:void()'
                aria-expanded='false'
              >
                <i className='flaticon-381-layer-1'></i>
                <span className='nav-text'>Pages</span>
              </a>
              <ul aria-expanded='false'>
                <li>
                  <a href='./page-register.html'>Register</a>
                </li>
                <li>
                  <a href='./page-login.html'>Login</a>
                </li>
                <li>
                  <a
                    className='has-arrow'
                    href='javascript:void()'
                    aria-expanded='false'
                  >
                    Error
                  </a>
                  <ul aria-expanded='false'>
                    <li>
                      <a href='./page-error-400.html'>Error 400</a>
                    </li>
                    <li>
                      <a href='./page-error-403.html'>Error 403</a>
                    </li>
                    <li>
                      <a href='./page-error-404.html'>Error 404</a>
                    </li>
                    <li>
                      <a href='./page-error-500.html'>Error 500</a>
                    </li>
                    <li>
                      <a href='./page-error-503.html'>Error 503</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href='./page-lock-screen.html'>Lock Screen</a>
                </li>
              </ul>
            </li>
          </ul>
          <div className='copyright'>
            <p>
              <strong>Acara Ticketing Dashboard</strong> © 2021 All Rights
              Reserved
            </p>
            <p>
              Made with <span className='heart'></span> by DexignZone
            </p>
          </div>
        </div>
      </div>

      <div className='content-body'>
        <div className='container-fluid'>
          <div
            className='modal fade'
            id='addOrderModalside'
          >
            <div
              className='modal-dialog'
              role='document'
            >
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Add Event</h5>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                  >
                    <span>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  <form>
                    <div className='form-group'>
                      <label className='text-black font-w500'>Event Name</label>
                      <input
                        type='text'
                        className='form-control'
                      />
                    </div>
                    <div className='form-group'>
                      <label className='text-black font-w500'>Event Date</label>
                      <input
                        type='date'
                        className='form-control'
                      />
                    </div>
                    <div className='form-group'>
                      <label className='text-black font-w500'>
                        Description
                      </label>
                      <input
                        type='text'
                        className='form-control'
                      />
                    </div>
                    <div className='form-group'>
                      <button
                        type='button'
                        className='btn btn-primary'
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-3 col-xxl-4'>
              <div className='row'>
                <div className='col-xl-12 col-md-6'>
                  <div className='card'>
                    <div className='card-header border-0 pb-0'>
                      <h4 className='fs-20'>Best Selling</h4>
                      <select className='form-control style-1 default-select '>
                        <option>This Week</option>
                        <option>Next Week</option>
                        <option>This Month</option>
                        <option>Next Month</option>
                      </select>
                    </div>
                    <div className='card-body'>
                      <div id='donutChart'></div>
                      <div className='d-flex justify-content-between mt-4'>
                        <div className='pr-2'>
                          <svg
                            width='20'
                            height='8'
                            viewBox='0 0 20 8'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <rect
                              width='20'
                              height='8'
                              rx='4'
                              fill='#214BB8'
                            />
                          </svg>
                          <h4 className='fs-18 text-black mb-1 font-w600'>
                            21,512
                          </h4>
                          <span className='fs-14'>Ticket Left</span>
                        </div>
                        <div className='pr-2'>
                          <svg
                            width='20'
                            height='8'
                            viewBox='0 0 20 8'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <rect
                              width='20'
                              height='8'
                              rx='4'
                              fill='#FE634E'
                            />
                          </svg>
                          <h4 className='fs-18 text-black mb-1 font-w600'>
                            45,612
                          </h4>
                          <span className='fs-14'>Ticket Sold</span>
                        </div>
                        <div className=''>
                          <svg
                            width='20'
                            height='8'
                            viewBox='0 0 20 8'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <rect
                              width='20'
                              height='8'
                              rx='4'
                              fill='#45ADDA'
                            />
                          </svg>
                          <h4 className='fs-18 text-black mb-1 font-w600'>
                            275
                          </h4>
                          <span className='fs-14'>Event Held</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-xl-12 col-md-6'>
                  <div className='card'>
                    <div className='card-header border-0 pb-0'>
                      <h4 className='fs-20'>Latest Sales</h4>
                      <select className='form-control style-1 default-select '>
                        <option>This Week</option>
                        <option>Next Week</option>
                        <option>This Month</option>
                        <option>Next Month</option>
                      </select>
                    </div>
                    <div
                      className='card-body pb-0 dz-scroll height630 loadmore-content'
                      id='latestSalesContent'
                    >
                      <div className='pb-3 mb-3 border-bottom'>
                        <p className='font-w600'>
                          <a
                            href='event.html'
                            className='text-black'
                          >
                            The Story’s of Danau Toba (Drama Theater)
                          </a>
                        </p>
                        <div className='d-flex align-items-end'>
                          <img
                            src='images/profile/20.jpg'
                            alt=''
                            width='42'
                            className='rounded-circle mr-2'
                          />
                          <div className='mr-auto'>
                            <h4 className='fs-14 mb-0'>
                              <a
                                href='app-profile.html'
                                className='text-black'
                              >
                                Steffany Humble
                              </a>
                            </h4>
                            <span className='fs-12'>2m ago</span>
                          </div>
                          <span className='badge badge-sm light badge-primary'>
                            4 Ticket
                          </span>
                        </div>
                      </div>
                      <div className='pb-3 mb-3 border-bottom'>
                        <p className='font-w600'>
                          <a
                            href='event.html'
                            className='text-black'
                          >
                            Envato Author SF Meetup
                          </a>
                        </p>
                        <div className='d-flex align-items-end'>
                          <img
                            src='images/profile/21.jpg'
                            alt=''
                            width='42'
                            className='rounded-circle mr-2'
                          />
                          <div className='mr-auto'>
                            <h4 className='fs-14 mb-0'>
                              <a
                                href='app-profile.com'
                                className='text-black'
                              >
                                Jacob Swing Swing
                              </a>
                            </h4>
                            <span className='fs-12'>6h ago</span>
                          </div>
                          <span className='badge badge-sm light badge-primary'>
                            2 Ticket
                          </span>
                        </div>
                      </div>
                      <div className='pb-3 mb-3 border-bottom'>
                        <p className='font-w600'>
                          <a
                            href='event.html'
                            className='text-black'
                          >
                            Envato Atuhor Community Fun Hiking at Sibayak
                            Mountaint
                          </a>
                        </p>
                        <div className='d-flex align-items-end'>
                          <img
                            src='images/profile/22.jpg'
                            alt=''
                            width='42'
                            className='rounded-circle mr-2'
                          />
                          <div className='mr-auto'>
                            <h4 className='fs-14 mb-0'>
                              <a
                                href='app-profile.com'
                                className='text-black'
                              >
                                Robert Carloz
                              </a>
                            </h4>
                            <span className='fs-12'>10h ago</span>
                          </div>
                          <span className='badge badge-sm light badge-primary'>
                            1 Ticket
                          </span>
                        </div>
                      </div>
                      <div className='pb-3 mb-3 border-bottom'>
                        <p className='font-w600'>
                          <a
                            href='event.html'
                            className='text-black'
                          >
                            Indonesia Envato Authors National Meetup
                          </a>
                        </p>
                        <div className='d-flex align-items-end'>
                          <img
                            src='images/profile/23.jpg'
                            alt=''
                            width='42'
                            className='rounded-circle mr-2'
                          />
                          <div className='mr-auto'>
                            <h4 className='fs-14 mb-0'>
                              <a
                                href='app-profile.com'
                                className='text-black'
                              >
                                Kevin Stefanus
                              </a>
                            </h4>
                            <span className='fs-12'>2m ago</span>
                          </div>
                          <span className='badge badge-sm light badge-primary'>
                            1 Ticket
                          </span>
                        </div>
                      </div>
                      <div className='pb-3 mb-3 border-bottom'>
                        <p className='font-w600'>
                          <a
                            href='event.html'
                            className='text-black'
                          >
                            Envato Author SF Meetup
                          </a>
                        </p>
                        <div className='d-flex align-items-end'>
                          <img
                            src='images/profile/21.jpg'
                            alt=''
                            width='42'
                            className='rounded-circle mr-2'
                          />
                          <div className='mr-auto'>
                            <h4 className='fs-14 mb-0'>
                              <a
                                href='app-profile.com'
                                className='text-black'
                              >
                                Jacob Swing Swing
                              </a>
                            </h4>
                            <span className='fs-12'>6h ago</span>
                          </div>
                          <span className='badge badge-sm light badge-primary'>
                            2 Ticket
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='card-footer text-center border-0'>
                      <a
                        className='btn btn-primary btn-sm dz-load-more'
                        id='latestSales'
                        href='javascript:void(0)'
                        rel='ajax/latest-sales.html'
                      >
                        View More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-9 col-xxl-8'>
              <div className='row'>
                <div className='col-xl-4 col-xxl-6 col-lg-4 col-sm-6'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='d-flex align-items-end'>
                        <div>
                          <p className='fs-14 mb-1'>New Sales</p>
                          <span className='fs-35 text-black font-w600'>
                            93
                            <svg
                              className='ml-1'
                              width='19'
                              height='12'
                              viewBox='0 0 19 12'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M2.00401 11.1924C0.222201 11.1924 -0.670134 9.0381 0.589795 7.77817L7.78218 0.585786C8.56323 -0.195262 9.82956 -0.195262 10.6106 0.585786L17.803 7.77817C19.0629 9.0381 18.1706 11.1924 16.3888 11.1924H2.00401Z'
                                fill='#33C25B'
                              />
                            </svg>
                          </span>
                        </div>
                        <canvas
                          className='lineChart'
                          id='chart_widget_2'
                          height='85'
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4 col-xxl-6 col-lg-4 col-sm-6'>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div>
                          <p className='fs-14 mb-1'>Event Held</p>
                          <span className='fs-35 text-black font-w600'>
                            856
                            <svg
                              className='ml-1'
                              width='19'
                              height='12'
                              viewBox='0 0 19 12'
                              fill='none'
                              xmlns='http://www.w3.org/2000/svg'
                            >
                              <path
                                d='M2.00401 11.1924C0.222201 11.1924 -0.670134 9.0381 0.589795 7.77817L7.78218 0.585786C8.56323 -0.195262 9.82956 -0.195262 10.6106 0.585786L17.803 7.77817C19.0629 9.0381 18.1706 11.1924 16.3888 11.1924H2.00401Z'
                                fill='#33C25B'
                              />
                            </svg>
                          </span>
                        </div>
                        <div className='d-inline-block ml-auto position-relative donut-chart-sale'>
                          <span
                            className='donut'
                            data-peity='{ "fill": ["rgb(254, 99, 78)", "rgba(244, 244, 244, 1)"],   "innerRadius": 31, "radius": 10}'
                          >
                            6/8
                          </span>
                          <small className='text-secondary'>90%</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-xl-4 col-xxl-12 col-lg-4'>
                  <div className='card'>
                    <div className='card-header align-items-start pb-0 border-0'>
                      <div>
                        <h4 className='fs-16 mb-0 text-black font-w600'>
                          Increase 25%
                        </h4>
                        <span className='fs-12'>Comparisson</span>
                      </div>
                      <select className='form-control style-1 default-select '>
                        <option>Daily</option>
                        <option>Monthly</option>
                        <option>Weekly</option>
                      </select>
                    </div>
                    <div className='card-body pt-0'>
                      <canvas
                        id='widgetChart1'
                        height='50'
                      ></canvas>
                    </div>
                  </div>
                </div>
                <div className='col-xl-12'>
                  <div
                    className='card'
                    id='sales-revenue'
                  >
                    <div className='card-header pb-0 d-block d-sm-flex border-0'>
                      <h3 className='fs-20 text-black mb-0'>Sales Revenue</h3>
                      <div className='card-action revenue-tabs mt-3 mt-sm-0'>
                        <ul
                          className='nav nav-tabs'
                          role='tablist'
                        >
                          <li className='nav-item'>
                            <a
                              className='nav-link active'
                              data-toggle='tab'
                              href='#monthly'
                              role='tab'
                              aria-selected='false'
                            >
                              Monthly
                            </a>
                          </li>
                          <li className='nav-item'>
                            <a
                              className='nav-link'
                              data-toggle='tab'
                              href='#weekly'
                              role='tab'
                              aria-selected='false'
                            >
                              Weekly
                            </a>
                          </li>
                          <li className='nav-item'>
                            <a
                              className='nav-link'
                              data-toggle='tab'
                              href='#today'
                              role='tab'
                              aria-selected='true'
                            >
                              Daily
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='card-body'>
                      <div
                        className='tab-content'
                        id='myTabContent'
                      >
                        <div
                          className='tab-pane fade show active'
                          id='user'
                          role='tabpanel'
                        >
                          <canvas
                            id='revenue'
                            className='chartjs'
                          ></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-xl-12'>
                  <div className='card'>
                    <div className='card-header border-0 pb-sm-0 pb-5'>
                      <h4 className='fs-20'>Recent Event List</h4>
                      <div className='dropdown custom-dropdown mb-0'>
                        <div data-toggle='dropdown'>
                          <svg
                            width='24'
                            height='24'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M12 12.9999C12.5523 12.9999 13 12.5522 13 11.9999C13 11.4477 12.5523 10.9999 12 10.9999C11.4477 10.9999 11 11.4477 11 11.9999C11 12.5522 11.4477 12.9999 12 12.9999Z'
                              stroke='#7E7E7E'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M12 5.99994C12.5523 5.99994 13 5.55222 13 4.99994C13 4.44765 12.5523 3.99994 12 3.99994C11.4477 3.99994 11 4.44765 11 4.99994C11 5.55222 11.4477 5.99994 12 5.99994Z'
                              stroke='#7E7E7E'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                            <path
                              d='M12 19.9999C12.5523 19.9999 13 19.5522 13 18.9999C13 18.4477 12.5523 17.9999 12 17.9999C11.4477 17.9999 11 18.4477 11 18.9999C11 19.5522 11.4477 19.9999 12 19.9999Z'
                              stroke='#7E7E7E'
                              strokeWidth='2'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            />
                          </svg>
                        </div>
                        <div className='dropdown-menu dropdown-menu-right'>
                          <a
                            className='dropdown-item'
                            href='javascript:void(0);'
                          >
                            Details
                          </a>
                          <a
                            className='dropdown-item text-danger'
                            href='javascript:void(0);'
                          >
                            Cancel
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className='card-body'>
                      <div className='event-bx owl-carousel'>
                        <div className='items'>
                          <div className='image-bx'>
                            <img
                              src='images/events/1.png'
                              alt=''
                            />
                            <div className='info'>
                              <p className='fs-18 font-w600'>
                                <a
                                  href='event-detail.html'
                                  className='text-black'
                                >
                                  International Live Choice Festivals (2020)
                                </a>
                              </p>
                              <span className='fs-14 text-black d-block mb-3'>
                                Manchester, London
                              </span>
                              <p className='fs-12'>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad mini
                              </p>
                              <ul>
                                <li>
                                  <i className='las la-dollar-sign'></i>$124,00
                                </li>
                                <li>
                                  <i className='las la-calendar'></i>June 20,
                                  2020
                                </li>
                                <li>
                                  <i className='fa fa-ticket'></i>561 pcs
                                </li>
                                <li>
                                  <i className='las la-clock'></i>08:35 AM
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className='items'>
                          <div className='image-bx'>
                            <img
                              src='images/events/3.png'
                              alt=''
                            />
                            <div className='info'>
                              <p className='fs-18 font-w600'>
                                <a
                                  href='event-detail.html'
                                  className='text-black'
                                >
                                  Envato Atuhor Community Fun Hiking at Sibayak
                                  Mt.
                                </a>
                              </p>
                              <span className='fs-14 text-black d-block mb-3'>
                                London, United Kingdom
                              </span>
                              <p className='fs-12'>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad mini
                              </p>
                              <ul>
                                <li>
                                  <i className='las la-dollar-sign'></i>$124,00
                                </li>
                                <li>
                                  <i className='las la-calendar'></i>June 20,
                                  2020
                                </li>
                                <li>
                                  <i className='fa fa-ticket'></i>561 pcs
                                </li>
                                <li>
                                  <i className='las la-clock'></i>08:35 AM
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className='items'>
                          <div className='image-bx'>
                            <img
                              src='images/events/1.png'
                              alt=''
                            />
                            <div className='info'>
                              <p className='fs-18 font-w600'>
                                <a
                                  href='event-detail.html'
                                  className='text-black'
                                >
                                  International Live Choice Festivals (2020)
                                </a>
                              </p>
                              <span className='fs-14 text-black d-block mb-3'>
                                Manchester, London
                              </span>
                              <p className='fs-12'>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad mini
                              </p>
                              <ul>
                                <li>
                                  <i className='las la-dollar-sign'></i>$124,00
                                </li>
                                <li>
                                  <i className='las la-calendar'></i>June 20,
                                  2020
                                </li>
                                <li>
                                  <i className='fa fa-ticket'></i>561 pcs
                                </li>
                                <li>
                                  <i className='las la-clock'></i>08:35 AM
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className='items'>
                          <div className='image-bx'>
                            <img
                              src='images/events/2.png'
                              alt=''
                            />
                            <div className='info'>
                              <p className='fs-18 font-w600'>
                                <a
                                  href='event-detail.html'
                                  className='text-black'
                                >
                                  Envato Indonesian Authors Meetup 2020
                                </a>
                              </p>
                              <span className='fs-14 text-black d-block mb-3'>
                                Medan, Indonesia
                              </span>
                              <p className='fs-12'>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad mini
                              </p>
                              <ul>
                                <li>
                                  <i className='las la-dollar-sign'></i>$124,00
                                </li>
                                <li>
                                  <i className='las la-calendar'></i>June 20,
                                  2020
                                </li>
                                <li>
                                  <i className='fa fa-ticket'></i>561 pcs
                                </li>
                                <li>
                                  <i className='las la-clock'></i>08:35 AM
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className='items'>
                          <div className='image-bx'>
                            <img
                              src='images/events/3.png'
                              alt=''
                            />
                            <div className='info'>
                              <p className='fs-18 font-w600'>
                                <a
                                  href='event-detail.html'
                                  className='text-black'
                                >
                                  Envato Atuhor Community Fun Hiking at Sibayak
                                  Mt.
                                </a>
                              </p>
                              <span className='fs-14 text-black d-block mb-3'>
                                London, United Kingdom
                              </span>
                              <p className='fs-12'>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad mini
                              </p>
                              <ul>
                                <li>
                                  <i className='las la-dollar-sign'></i>$124,00
                                </li>
                                <li>
                                  <i className='las la-calendar'></i>June 20,
                                  2020
                                </li>
                                <li>
                                  <i className='fa fa-ticket'></i>561 pcs
                                </li>
                                <li>
                                  <i className='las la-clock'></i>08:35 AM
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='footer'>
        <div className='copyright'>
          <p>
            Copyright © Designed &amp; Developed by{' '}
            <a
              href='http://dexignzone.com/'
              target='_blank'
            >
              DexignZone
            </a>{' '}
            2021
          </p>
        </div>
      </div>
    </>
  );
}
