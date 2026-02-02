import Link from 'next/link';

import { env } from '@/config/env';
import { Head } from './head';

export function Header() {
  return (
    <>
      <div className='nav-header'>
        <Link
          href='/'
          className='size-full flex justify-center items-center'
        >
          <img
            src='/zeinmotiontm2.webp'
            alt={`${env.brandSEO} Logo`}
            className='w-24 aspect-square object-contain'
          />
        </Link>

        <div className='nav-control'>
          <div className='hamburger'>
            <span className='line'></span>
            <span className='line'></span>
            <span className='line'></span>
          </div>
        </div>
      </div>

      <Head />

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
          <div className='row'></div>
        </div>
      </div>

      <div className='footer'>
        <div className='copyright'>
          <p className='mt-4 text-sm text-ink/90'>
            © {new Date().getFullYear()} {env.brand}. All rights reserved -
            Created and developed by{' '}
            <a
              href='https://edier-hm.netlify.app/en/'
              target='_blank'
              rel='noopener noreferrer'
              className='underline'
            >
              Edier Hernández
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
