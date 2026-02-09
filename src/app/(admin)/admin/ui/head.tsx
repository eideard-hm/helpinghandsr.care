import { useRouter } from 'next/navigation';

import { signOutBrowser } from '@/actions/auth/browser/actions';
import { useHeaderTitle } from '@/app/providers/header-title.provider';
import { getInitials } from '@/lib/get-initials';

export function Head() {
  const router = useRouter();

  const { title } = useHeaderTitle();
  const initials = getInitials('Test');

  const handleOptionsToggle = () => {
    const dropdown = document.getElementById('profile-dropdown');
    const menu = document.getElementById('dropdown-menu');
    if (dropdown) {
      dropdown.classList.toggle('show');
    }
    if (menu) {
      menu.classList.toggle('show');
    }
  };

  const handleLogout = async () => {
    await signOutBrowser();
    router.replace('/auth/login');
    router.refresh();
  };

  return (
    <header className='header'>
      <div className='header-content'>
        <nav className='navbar navbar-expand'>
          <div className='navbar-collapse justify-content-between'>
            <div className='header-left'>
              <h1 className='dashboard_bar'>{title}</h1>
            </div>

            <ul className='navbar-nav header-right'>
              <li
                className='nav-item dropdown header-profile'
                id='profile-dropdown'
              >
                <button
                  className='nav-link'
                  role='button'
                  data-toggle='dropdown'
                  aria-expanded='true'
                  onClick={handleOptionsToggle}
                >
                  <div
                    className='flex h-9 w-9 items-center justify-center rounded-full 
                    bg-linear-to-br from-indigo-500 to-purple-600
                    text-sm font-semibold text-white'
                  >
                    {initials}
                  </div>

                  <div className='flex flex-col leading-tight'>
                    <span className='text-sm font-semibold text-gray-900'>
                      Test
                    </span>
                    <span className='text-xs font-medium uppercase text-gray-500'>
                      ADMIN
                    </span>
                  </div>
                </button>

                <div
                  className='dropdown-menu dropdown-menu-right'
                  id='dropdown-menu'
                >
                  <button
                    onClick={handleLogout}
                    className='dropdown-item flex!'
                  >
                    <svg
                      id='icon-logout'
                      xmlns='http://www.w3.org/2000/svg'
                      className='text-danger'
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                      <polyline points='16 17 21 12 16 7'></polyline>
                      <line
                        x1='21'
                        y1='12'
                        x2='9'
                        y2='12'
                      ></line>
                    </svg>
                    <span className='ml-2'>Logout</span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
