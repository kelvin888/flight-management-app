import { Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/react';
import { useAuthStore } from '@/store/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const ProfileDropdown = () => {
    const { authenticatedUser, clearAuthUser } = useAuthStore()

    const handleLogout = () => {
        clearAuthUser()
    }
    return (
        <Menu>
            <MenuButton>
                <div className='flex gap-3 items-center justify-center border border-gray-300 rounded-md w-fit h-12 px-2'>
                    {authenticatedUser?.name.split(" ")[0]}
                    <FontAwesomeIcon size="2x" icon={faUserCircle} />
                </div>
            </MenuButton>
            <MenuItems anchor="bottom" className="z-20 shadow-lg bg-white border dark:bg-gray-400 border-gray-200 w-32">
                <MenuItem>
                    <div className='flex justify-center items-center py-2 cursor-pointer' onClick={handleLogout}>
                        <span className='pr-2'>logout</span> <FontAwesomeIcon icon={faSignOut} />
                    </div>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
};

export default ProfileDropdown;
