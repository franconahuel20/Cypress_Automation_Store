describe('Proyecto pagina https://automationteststore.com/', function () {
    beforeEach(function () {
        // runs before each test in this block
        cy.visit('https://automationteststore.com/');
    });

    describe('US1. Como usuario, necesito poder registrarme en el sitio.', function () {

        it.skip('TC-ATS-001-01-Happy path - Registro de nuevo usuario', function () {
            // Arrange
            let vUser = 'U00000Axxy';

            cy.get('#customer_menu_top > li > a').click();
            cy.get('#accountFrm > fieldset > .btn').click();
            cy.get('#AccountFrm_firstname').type(vUser);
            cy.get('#AccountFrm_lastname').type(vUser);
            cy.get('#AccountFrm_email').type(vUser + '@' + vUser + '.com');
            cy.get('#AccountFrm_address_1').type(vUser);
            cy.get('#AccountFrm_city').type(vUser);
            cy.get('#AccountFrm_country_id').select('Argentina');
            cy.get('#AccountFrm_postcode').type(vUser);
            cy.get('#AccountFrm_zone_id').select('Tucuman');
            cy.get('#AccountFrm_loginname').type(vUser);
            cy.get('#AccountFrm_password').type(vUser);
            cy.get('#AccountFrm_confirm').type(vUser);
            cy.get('#AccountFrm_newsletter1').type(1);
            cy.get('#AccountFrm_agree').type(1);

            // Act
            cy.get('.col-md-2 > .btn').click();

            // Assert
            cy.get('.maintext').should('contain.text','Your Account Has Been Created!');
        });

        it('TC-ATS-001-02-Registracion de usuario existente', function () {
            // Arrange
            let vUser = 'U00000Axxy';

            cy.get('#customer_menu_top > li > a').click();
            cy.get('#accountFrm > fieldset > .btn').click();
            cy.get('#AccountFrm_firstname').type(vUser);
            cy.get('#AccountFrm_lastname').type(vUser);
            cy.get('#AccountFrm_email').type(vUser + '@' + vUser + '.com');
            cy.get('#AccountFrm_address_1').type(vUser);
            cy.get('#AccountFrm_city').type(vUser);
            cy.get('#AccountFrm_country_id').select('Argentina');
            cy.get('#AccountFrm_postcode').type(vUser);
            cy.get('#AccountFrm_zone_id').select('Tucuman');
            cy.get('#AccountFrm_loginname').type(vUser);
            cy.get('#AccountFrm_password').type(vUser);
            cy.get('#AccountFrm_confirm').type(vUser);
            cy.get('#AccountFrm_newsletter1').type(1);
            cy.get('#AccountFrm_agree').type(1);

            // Act
            cy.get('.col-md-2 > .btn').click();

            // Assert
            cy.get('.alert').should('contain.text', 'Error: E-Mail Address is already registered!');
        });

        it('TC-ATS-001-03-Registracion de usuario con campo E-mail vacío y Login Name ya existente', function () {
            // Arrange
            let vUser = 'U00000Axxy';

            cy.get('#customer_menu_top > li > a').click();
            cy.get('#accountFrm > fieldset > .btn').click();
            cy.get('#AccountFrm_firstname').type(vUser);
            cy.get('#AccountFrm_lastname').type(vUser);
            cy.get('#AccountFrm_email').type(' ');
            cy.get('#AccountFrm_address_1').type(vUser);
            cy.get('#AccountFrm_city').type(vUser);
            cy.get('#AccountFrm_country_id').select('Argentina');
            cy.get('#AccountFrm_postcode').type(vUser);
            cy.get('#AccountFrm_zone_id').select('Tucuman');
            cy.get('#AccountFrm_loginname').type(vUser);
            cy.get('#AccountFrm_password').type(vUser);
            cy.get('#AccountFrm_confirm').type(vUser);
            cy.get('#AccountFrm_newsletter1').type(1);
            cy.get('#AccountFrm_agree').type(1);

            // Act
            cy.get('.col-md-2 > .btn').click();

            // Assert
            cy.get('.alert').should('contain.text', 'This login name is not available. Try different login name!');
            cy.get('.alert').should('contain.text', 'Email Address does not appear to be valid!');
        });
        
    
    });
    
    describe('US2. Como usuario, necesito poder iniciar sesión.', function () {
        it('TC-ATS-002-01-Happy path - Login de usuario exitoso', function () {
            // Arrange
            let vUser = 'U00000Axx';
            let vPassword = 'U00000Axx'

            cy.get('#customer_menu_top > li > a').click();
            cy.get('#loginFrm_loginname').type(vUser);
            cy.get('#loginFrm_password').type(vPassword);

            // Act
            cy.get('#loginFrm > fieldset > .btn').click()

            // Assert
            cy.get('.subtext').should('contain.text','U00000Axx');
        });

        it('TC-ATS-002-02 - Login de usuario con campos Login Name y Password vacíos', function () {
            // Arrange
            cy.get('#customer_menu_top > li > a').click();
            cy.get('#loginFrm_loginname').type(' ');
            cy.get('#loginFrm_password').type(' ');

            // Act
            cy.get('#loginFrm > fieldset > .btn').click()

            // Assert
            cy.get('.alert').should('contain.text', 'Error: Incorrect login or password provided.');
        });

        it('TC-ATS-002-03 - Login de usuario con campos Login Name y Password incorrectos', function () {
            // Arrange
            let vUser = 'U00000Axxsffsfsfggs';
            let vPassword = 'U00000Axx&·%·%·%·%'
            cy.get('#customer_menu_top > li > a').click();
            cy.get('#loginFrm_loginname').type(vUser);
            cy.get('#loginFrm_password').type(vPassword);

            // Act
            cy.get('#loginFrm > fieldset > .btn').click()

            // Assert
            cy.get('.alert').should('contain.text', 'Error: Incorrect login or password provided.');
        });
    });

    describe('US3. Como usuario, quiero poder agregar productos al carrito', function () {
        it('TC-ATS-003-01-Happy path - Agregar productos al carrito con el usuario logueado correctamente', function () {
            // Arrange
            let vUser = 'U00000Axx';
            let vPassword = 'U00000Axx'
            cy.get('#customer_menu_top > li > a').click();
            cy.get('#loginFrm_loginname').type(vUser);
            cy.get('#loginFrm_password').type(vPassword);
    
            // Act
            cy.get('#loginFrm > fieldset > .btn').click()
            cy.get('.nav-pills > :nth-child(1) > .active').click();
            cy.get('#block_frame_featured_1769 > .thumbnails > :nth-child(1) > .thumbnail > .pricetag > .productcart > .fa').click();
            cy.get('.block_7 > .nav > .dropdown > .dropdown-toggle').click()

            // Assert
            cy.get('.maintext').should('contain.text','Shopping Cart');
        });

        it('TC-ATS-003-02 - Agregar productos al carrito sin el usuario logueado correctamente', function () {
            // Arrange
            cy.get('#block_frame_featured_1769 > .thumbnails > :nth-child(1) > .thumbnail > .pricetag > .productcart > .fa').click();
    
            // Act
            cy.get('.block_7 > .nav > .dropdown > .dropdown-toggle').click()

            // Assert
            cy.get('.maintext').should('contain.text','Shopping Cart');
        });

        it('TC-ATS-003-03 - Ingresar a Shopping Cart sin productos seleccionados y sin el usuario logueado correctamente', function () {
            // Arrange
            cy.get('.block_7 > .nav > .dropdown > .dropdown-toggle').click()

            // Act
            cy.get('.maintext').should('contain.text','Shopping Cart');

            // Assert
            cy.get('.col-md-4 > .btn').click()
        });
        
    });

    describe('US4. Como usuario quiero poder realizar la compra de mi pedido', function () {
        it('TC-ATS-004-01-Happy path - Realizar compra con productos en el carrito y con el usuario logueado correctamente', function () {
            // Arrange
            let vUser = 'U00000Axx';
            let vPassword = 'U00000Axx'
            cy.get('#customer_menu_top > li > a').click();
            cy.get('#loginFrm_loginname').type(vUser);
            cy.get('#loginFrm_password').type(vPassword);
    
            // Act
            cy.get('#loginFrm > fieldset > .btn').click()
            cy.get('.nav-pills > :nth-child(1) > .active').click();
            cy.get('#block_frame_featured_1769 > .thumbnails > :nth-child(1) > .thumbnail > .pricetag > .productcart > .fa').click();
            cy.get('.block_7 > .nav > .dropdown > .dropdown-toggle').click()
            cy.get('.maintext').should('contain.text','Shopping Cart');
            cy.get('#cart_checkout2').click()
            cy.get('#checkout_btn').click()

            // Assert
            cy.get('.maintext').should('contain.text','Your Order Has Been Processed!');
        });

        it('TC-ATS-004-02 - Realizar compra sin productos en el carrito y con el usuario logueado correctamente', function () {
            // Arrange
            let vUser = 'U00000Axx';
            let vPassword = 'U00000Axx'
            cy.get('#customer_menu_top > li > a').click();
            cy.get('#loginFrm_loginname').type(vUser);
            cy.get('#loginFrm_password').type(vPassword);
    
            // Act
            cy.get('#loginFrm > fieldset > .btn').click()
            cy.get('.nav-pills > :nth-child(1) > .active').click();
            cy.get('.block_7 > .nav > .dropdown > .dropdown-toggle').click()

            // Assert
            cy.get('.maintext').should('contain.text','Shopping Cart');
            cy.get('.col-md-4 > .btn').click()
        });

        it('TC-ATS-004-03 - Realizar compra con productos en el carrito y sin el usuario logueado correctamente', function () {
            // Arrange
            cy.get('#block_frame_featured_1769 > .thumbnails > :nth-child(1) > .thumbnail > .pricetag > .productcart > .fa').click();
    
            // Act
            cy.get('.block_7 > .nav > .dropdown > .dropdown-toggle').click()
            cy.get('.maintext').should('contain.text','Shopping Cart');
            cy.get('#cart_checkout2').click()

            // Assert
            cy.get('.maintext').should('contain.text','Account Login');
        });
    });
});