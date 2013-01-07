define(['jquery', 'underscore', 'marionette'], function($, _, Marionette) {
  var UserToolsLayout = Marionette.Layout.extend({
    tagName: 'ul',
    template: '#user-tools-template',
    className: 'user-tools-list',

    ui: {
      notificationCenter: '.user-notification-center',
      notificationCount: '.user-notification-count'
    },

    events: {
      'click .user-tools-notification': function() {
        this.ui.notificationCenter.toggle();
      }
    },

    collectionEvents: {
      'add': 'notificationAdded'
    },

    onShow: function() {
      if(!this._fetchNotifications)
        this._fetchNotifications = _.bind(this.fetchNotifications, this);

      this._notificationsTimer = setInterval(this._fetchNotifications, 60000);
    },

    onClose: function() {
      if (this._notificationsTimer) {
        clearInterval(this._notificationsTimer);
        this._notificationsTimer = null;
      }
    },

    fetchNotifications: function() {
      if (this.model.get('loggedIn')) {
        if (this.collection.length == 5) {
          this.collection.reset([]);
          this.collection.add({
            title: 'Info',
            text: 'For purposes of the demo, we have reset the list of notifications.'
          });
        }
        else {
          this.collection.add({
            title: 'Alert',
            text: 'Another notification has been added'
          });
        }
      }
    },

    notificationAdded: function(){
      var container = $('.user-tools');
      var counter = this.ui.notificationCount, count = this.collection.length;
      counter.fadeOut(100, function() {
        counter.text(count.toString());
        counter.fadeIn(600);
      });

      var notification = this.collection.at(this.collection.length-1);
      var title = notification.get('title');
      var growl = $('<div>').addClass('user-notification-growl').text(notification.get('text'));
      if (title && title.length) {
        $('<span>').text(title + ': ').prependTo(growl);
      }
      growl.appendTo(container);

      var outerWidth = $(container).innerWidth();
      var innerWidth = growl.innerWidth();
      growl.css({ 'left': (outerWidth-innerWidth)/2 + 'px' });
      growl.slideDown(500).delay(5000).fadeOut(2000, function() { $(this).remove(); });
    }

  });

  return UserToolsLayout;
});
