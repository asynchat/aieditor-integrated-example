import { Link, Outlet } from '@umijs/max';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <a href="https://github.com/asynchat/aieditor-integrated-example">Github</a>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
