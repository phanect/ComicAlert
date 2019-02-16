"use strict";

import Link from "next/link";

export default () => (
  <div class="hero-unit">
    <p style="text-align: center;">
      <Link className="btn-auth btn-twitter large"
      href="<%= twitterPath %>"> Log in with Twitter </a>
      &nbsp;
      <Link className="btn-auth btn-facebook large"
      href="<%= facebookPath %>"> Log in with Facebook </a>
    </p>
  </div>
);
