$(function() {

  var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  function renderSite(data) {
    data = $.xml2json(data);
    var posts = data.channel.item;
   
    renderLatestArticles(posts);
  }

  function renderLatestArticles(posts) {
    var $parent = $('.sidebox.latest-articles .sidebox-content');
    var $list = $parent.find("ul");
    if(!$parent) {return};

    for(var i = 0; i < Math.min(posts.length, 5); i++) {
      var p = posts[i];
      var $a = $('<li><a href="' + p.link + '">' + p.title + '</div></a></li>');
      if(i == 4) {
        $a.addClass('last');
      }
      $list.append($a);
    }
    
    $parent.removeClass('loading');
  }

  $.ajax({
    dataType: 'xml',
    url: '/rss',
    type: 'GET'
  }).success(renderSite);
});
