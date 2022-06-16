const app = {
    initPages: function () {
        const thisApp = this;

        thisApp.pages = document.querySelector('#pages').children;
        thisApp.navLinks = document.querySelectorAll('.top-nav nav-text a');

        const idFromHash = window.location.hash.replace('#/', '');

        let pageMatchingHash = thisApp.pages[0].id;

        for (const page of thisApp.pages) {
            if (page.id == idFromHash) {
                pageMatchingHash = page.id;
                break;
            }
        }

        thisApp.activatePage(pageMatchingHash);

        for (const link of thisApp.navLinks) {
            link.addEventListener('click', function (event) {
                const clickedElement = this;
                event.preventDefault();

                /* get page id from href attribute */
                const id = clickedElement.getAttribute('href').replace('#', '');

                /* run thisApp.activatePage with that id */
                thisApp.activatePage(id);

                /* change URL hash */
                window.location.hash = '#/' + id;
            });
        }
    },

    activatePage: function (pageId) {
        const thisApp = this;

        /* add class "active" to matching pages, remove from non-maching*/
        for (const page of thisApp.pages) {
            //  if(page.id == pageId){
            //    page.classList.add(classNames.pages.active);
            //  } else {
            //    page.classList.remove(classNames.pages.active);

            page.classList.toggle('active', page.id == pageId);
        }

        /* add class "active" to matching link, remove from non-maching*/
        for (const link of thisApp.navLinks) {
            link.classList.toggle('active', link.getAttribute('href') == '#' + pageId);
        }
    },
    initProduct: function () {
        const thisApp = this;

        thisApp.data = {};

        const url = settings.db.url + '/' + settings.db.products;

        fetch(url)
            .then(function (rawResponse) {
                return rawResponse.json();
            })
            .then(function (prasedResponse) {


                /*save prasedResponse as thisApp.data.products */
                thisApp.data.products = prasedResponse;
                /*execute initMenu method */
                thisApp.initMenu();
                console.log('praseResponse', prasedResponse);
            });
    },
    initHome: function () {
        const thisApp = this;

        thisApp.widgetContainer = document.querySelector(select.containerOf.home);
        thisApp.home = new Home(thisApp.widgetContainer);
    },
    initContact: function () {
        const thisApp = this;

        thisApp.widgetContainer = document.querySelector(select.containerOf.home);
        thisApp.home = new Home(thisApp.widgetContainer);
    },


    init: function () {
        const thisApp = this;
        //console.log('*** App starting ***');
        //console.log('thisApp:', thisApp);
        //console.log('classNames:', classNames);
        //console.log('settings:', settings);
        //console.log('templates:', templates);

        thisApp.initPages();

        thisApp.initProduct();

        thisApp.initContact();
        thisApp.initHome();
    },
};
app.init();