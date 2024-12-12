---
layout: archive
---

{{ content }}

<h3 class="archive__subtitle">
  {{ site.data.ui-text[site.locale].recent_posts | default: "Recent Posts" }}
</h3>

{% assign posts = site.posts | sort "date" %}
{% assign entries_layout = page.entries_layout | default: 'list' %}

<ul>
<li>Posts: {{ posts | inspect }}</li>
<li>entries_layout: {{entries_layout | inspect }}</li>
</ul>

<div class="entries-{{ entries_layout }}">
  {% include documents-collection.html entries=posts type=entries_layout %}
</div>

