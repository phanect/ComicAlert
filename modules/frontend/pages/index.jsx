"use strict";

import App from "../layout/app";

import "../style/index.scss";

export default () => (
  <App>
    <main>
      <h2>新着</h2>
      <div id="episodes-list" class="container-fluid">
        <div class="row-fluid">
          <% if (episodes) { %>
            <% for (var i = 0, ii = episodes.length; i < ii; i++) { %>
              <%- partial("templates/comiccard", {comic : comics[i], episode : episodes[i]}) %>
            <% } %>
          <% } else {%>
            <p>未読のコミックはありません。</p>
          <% } %>
        </div>
      </div>
    </main>
  </App>
);
