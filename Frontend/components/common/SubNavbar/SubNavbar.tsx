import HamburgerIcon from '@/components/icons/hamburgerIcon.svg'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { setProductCategoriesList } from '@/lib/redux/slices/product_categories'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import CategoryList from './CategoryList'
import styles from './SubNavbar.module.css'
import { subNavItemMapping } from './definitions'

const SubNavbar = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category/list-dashboard', { method: 'POST' })
        const data = await response.json()
        dispatch(setProductCategoriesList(data.data))
      } catch (error) {
        console.error('Error fetching category:', error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className={styles.subNavbarWrapper}>
      <div className={cn(styles.subNavbar, 'container')}>
        <NavigationMenu>
          <NavigationMenuList className={styles.subNavbarList}>
            <NavigationMenuItem className={styles.categoryMenuItem}>
              <NavigationMenuTrigger className={styles.categoryWrapper}>
                <Image alt='hamburger' src={HamburgerIcon} className={styles.hamburgerIcon} />
                <div className={styles.buttonText}>Danh mục</div>
              </NavigationMenuTrigger>
              <NavigationMenuContent className={`${styles.categoryTableWrapper} w-full`}>
                <NavigationMenuLink>
                  <div className={styles.categoryTable}>
                    <CategoryList />
                    <div className={styles.subcategoryList}></div>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {subNavItemMapping.map(
              ({ title, icon, className, iconClassName, url, hoverIcon }, idx) => (
                <NavigationMenuItem
                  key={`${title}-${idx}`}
                  className={cn(styles.subNavItem, className)}
                >
                  <Link href={url} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), styles.subNavItemLink)}
                    >
                      <Image
                        alt={title}
                        src={icon}
                        className={cn(
                          hoverIcon ? styles.navNormalIcon : styles.navItemIcon,
                          iconClassName
                        )}
                      />
                      {hoverIcon && (
                        <Image
                          alt={title}
                          src={hoverIcon}
                          className={cn(styles.hoverIcon, iconClassName, 'w-5')}
                        />
                      )}
                      {title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

export default SubNavbar
