
      /* ================================================
         YEAR
         ================================================ */

      const yearElement = document.getElementById('year');

      if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
      }


      /* ================================================
         THEME TOGGLE
         ================================================ */

        const html = document.documentElement;
        const themeBtn = document.getElementById('themeToggle');
        const themeLabel = document.getElementById('themeLabel');

        const desktopLogo = document.getElementById('desktopLogo');
        const mobileLogo = document.getElementById('mobileLogo');
        const footerLogo = document.getElementsByClassName('footerLogo');

        function updateThemeAssets(theme) {

          // Update desktop logo
          if (desktopLogo) {
            const logo = theme === 'dark'
              ? desktopLogo.dataset.darkLogo
              : desktopLogo.dataset.lightLogo;

            if (logo) desktopLogo.src = logo;
          }

          // Update mobile logo
          if (mobileLogo) {
            const logo = theme === 'dark'
              ? mobileLogo.dataset.darkLogo
              : mobileLogo.dataset.lightLogo;

            if (logo) mobileLogo.src = logo;
          }

          //update footer logo
          if (footerLogo) {
            const logo = theme === 'dark'
            ? footerLogo.dataset.darkLogo
            : footerLogo.dataset.lightLogo;

            if (logo) footerLogo.src = logo;
          }

          // Update theme label
          if (themeLabel) {
            themeLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
          }

          // Update button accessibility label
          if (themeBtn) {
            themeBtn.setAttribute(
              'aria-label',
              `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`
            );
          }
        }

        // Load saved theme
        let savedTheme = 'dark';

        try {
          savedTheme = localStorage.getItem('wc-theme') || 'dark';
        } catch (error) {
          console.warn('Theme preference could not be loaded.');
        }

        // Apply initial theme
        html.setAttribute('data-theme', savedTheme);
        updateThemeAssets(savedTheme);

        // Toggle theme
        if (themeBtn) {

          themeBtn.addEventListener('click', function () {

            const currentTheme = html.getAttribute('data-theme');

            const nextTheme = currentTheme === 'dark'
              ? 'light'
              : 'dark';

            // Apply theme
            html.setAttribute('data-theme', nextTheme);

            // Update logos and labels
            updateThemeAssets(nextTheme);

            // Persist preference
            try {
              localStorage.setItem('wc-theme', nextTheme);
            } catch (error) {
              console.warn('Theme preference could not be saved.');
            }

          });

        }

      /* ================================================
         MOBILE NAVIGATION
         ================================================ */

      const mobileToggle = document.getElementById('mobileToggle');
      const mobileMenu = document.getElementById('mobileMenu');
      const closeMenu = document.getElementById('closeMenu');

      function openMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.add('active');
        document.body.classList.add('menu-open');

        if (mobileToggle) {
          mobileToggle.setAttribute('aria-expanded', 'true');
        }

        if (closeMenu) {
          closeMenu.focus();
        }

      }

      function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');

        if (mobileToggle) {
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.focus();
        }

      }

      if (mobileToggle) {
        mobileToggle.addEventListener('click', openMobileMenu);
      }

      if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
      }

      if (mobileMenu) {

        mobileMenu.querySelectorAll('a').forEach(function (link) {

          link.addEventListener('click', closeMobileMenu);

        });

        mobileMenu.addEventListener('click', function (event) {

          if (event.target === mobileMenu) {
            closeMobileMenu();
          }

        });

      }

      document.addEventListener('keydown', function (event) {

        if (
          event.key === 'Escape' &&
          mobileMenu &&
          mobileMenu.classList.contains('active')
        ) {
          closeMobileMenu();
        }

      });


      /* ================================================
         SCROLL REVEAL
         ================================================ */

      const revealElements = document.querySelectorAll('[data-aos]');

      if ('IntersectionObserver' in window) {

        const observer = new IntersectionObserver(function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.style.animationPlayState = 'running';

              observer.unobserve(entry.target);

            }

          });

        }, {
          threshold: 0.15
        });

        revealElements.forEach(function (element) {

          element.style.animationPlayState = 'paused';

          observer.observe(element);

        });

      }