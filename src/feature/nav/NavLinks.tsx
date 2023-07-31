import { NavLink } from 'react-router-dom';
import { Trans } from '@lingui/macro';

export function NavLinks() {
  return (
    <>
      <NavLink className="mx-4 text-gray-600 hover:text-gray-900" to="/">
        <Trans >Products</Trans>
      </NavLink>

      <NavLink className="mx-4 text-gray-600 hover:text-gray-900" to="/feedback">
        <Trans >Feedbacks</Trans>
      </NavLink>
    </>
  )
}
