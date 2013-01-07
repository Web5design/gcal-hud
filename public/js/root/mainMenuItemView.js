define(['jquery', 'underscore', 'marionette', 'vent'], function($, _, Marionette, vent) {

  var MainMenuItemView = Marionette.ItemView.extend({
    template: '#root-template',
    className: 'container root-menu-region',

    events: {
      'submit .login-form': 'login',
      'click .root-nav-link': 'onModuleClick'
    },

    modelEvents: {
      'change:loggedIn': 'onLoggedInChange',
      'change:currentModule': 'onModuleChange'
    },

    window: $(window),
    body: $('body'),

    ui: {
      loginComponents: '.login-container',
      rootNavMenu: '.root-nav-menu'
    },

    moduleNames: 'module formulary inventory devices reports settings',

    onRender: function() {
      if (this.model.get('loggedIn')) {
        this.ui.loginComponents.hide();
      }
    },

    onShow: function() {
      this.body.addClass('show-menu');

      this.showMenuOverlay();      

      // save a reference to the bound function so we can release it later
      if(!this._adjustCenter)
        this._adjustCenter = _.bind(this.adjustCenter, this);
      this.window.on('resize', this._adjustCenter);
      this._adjustCenter();

      if (!this._keydown)
        this._keydown = _.bind(this.keydown, this);
      this.window.on('keydown', this._keydown);
    },

    onClose: function() {
      this.window.off('resize', this._adjustCenter);
      this.window.off('keydown', this._keydown);

      this.body.removeClass('show-menu');
    },

    showMenuOverlay: function() {
      var moduleOverlay = this.ui.rootNavMenu.next('.overlay');
      moduleOverlay.removeClass(this.moduleNames);

      var currentModule = this.model.get('currentModule');
      if (currentModule.length) {
        moduleOverlay.addClass('module').addClass(currentModule);
        this.ui.rootNavMenu.children('.root-nav-'+currentModule).addClass('running');
      }
    },

    adjustCenter: function() {
      var windowHeight = this.window.innerHeight();
      var height = this.ui.rootNavMenu.innerHeight();
      var compassHeight = 200, headerHeight = $('.module-header').innerHeight();
      
      if(windowHeight < height) {
        return;
      }

      var marginTop = (windowHeight - height - compassHeight) / 2 - headerHeight;
      this.ui.rootNavMenu.css({ 'margin-top': marginTop + 'px' });
    },

    keydown: function(ev) {
      if (ev.keyCode === 27 && this.model.get('currentModule').length) {
        this.$el.fadeOut(400, function() {
          vent.trigger('modal:mainMenu:hide');
        });
      }
    },

    login: function(ev) {
      ev.preventDefault();
      this.model.set({loggedIn: true, currentModule: ''});
    },

    onLoggedInChange: function(model, loggedIn) {
      if (loggedIn) {
        this.ui.loginComponents.fadeOut(600);
        this.ui.rootNavMenu.addClass('unlocked');
      }
    },

    onModuleClick: function(ev) {
      ev.preventDefault();
      var $li = $(ev.currentTarget).closest('li'), moduleName = $li.data('moduleName');
      if (moduleName === this.model.get('currentModule')) {
        this.onModuleChange(this.model, moduleName);
      }
      else {
        this.model.set({loggedIn: true, currentModule: moduleName});
      }
    },

    onModuleChange: function(model, moduleName) {
      if (moduleName && moduleName.length) {
        var $view = this.$el, $items = this.ui.rootNavMenu.children('li');
        var $li = $items.filter(function() { return $(this).data('moduleName') === moduleName; }).first();

        $li.addClass('running');
        $items.not($li).removeClass('running').animate({opacity: 0.2}, 200, function() {
          if ($items.filter(':animated').length === 0) {
            $view.fadeOut(600, function(){
              vent.trigger($li.children('.root-nav-link').data('eventName'));
            });
          }
        });
      }
      
    }
  });

  return MainMenuItemView;
});
