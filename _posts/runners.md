---
layout: post 
title: Java Code Runner 
permalink: /runners
hide: true
show_reading_time: false
---

{% capture code1 %}
console.log("Hello world!");

for(let i=0;i<5;i++){
  console.log("Number:", i);
}
{% endcapture %}

{% include runner.html
runner_id="runner1"
code=code1
%}