$( document ).ready( function(){

	'use strict';

	var styleEditor = {
		init: function(){
			var componentEditor = '.demo-editor';
			var buttonUpdate = '.button-update';
			var ddComponents = '.dropdown-components';
			var ddElement = '.dropdown-elements';
			var ddGroup = '.dropdown-group';
			var ddClasses = '.dropdown-classes';
			var styleElWrapper = '.style-element-wrapper';
			var styleEl = '.style-element';
			var classOptions = '.class-options';
			var classField = '.class-field';
			var componentGroup = '.component-group';
			var htmlExample = '.html-example';
			var component = 'typography';
			var stripElclasses  ='style-element columns-2 icon-check';
			var defaults = ['size', 'bkg-color', 'bkg-hover-color', 'border-style', 'corner', 'border-color', 'border-hover-color', 'text-align', 'font-weight' , 'color', 'color-hover'];
			
			// Add actions
			$( componentEditor ).each( function(){

				var editor = $( this );
				var htmlStatus = true;

				// Check class support
				showComponent( editor );

				// Field event
				$( this ).find( classField ).focus( function() {
					editor.addClass( 'active' );
				});
				$( this ).find( classField ).blur( function() {
					editor.removeClass( 'active' );
				});

				// Update button event
				$( this ).find( buttonUpdate ).on( 'click', function(){
					applyClasses( editor.find( classField ) );
				});

				// Hide/show html
				if( htmlStatus ){
					editor.find( htmlExample ).css({ display: 'none' });
					editor.find( '.hide-html' ).text( 'Show HTML' );
				}
				$( this ).find( '.hide-html' ).on( 'click', function( event ){
					event.preventDefault();
					if( !htmlStatus ){
						editor.find( htmlExample ).css({ display: 'none' });
						$( this ).text( 'Show HTML' );
						htmlStatus = true;
					}else{
						editor.find( htmlExample ).css({ display: 'block' });
						$( this ).text( 'Hide HTML' );
						htmlStatus = false;
					}
				});

				// Component dropdown
				$( this ).find( ddComponents ).find( 'li:first-child' ).addClass( 'current' );
				$( this ).find( ddComponents ).find( 'button span:first-child' ).text( $( this ).find( ddComponents ).find( '.current a' ).text() );
				component = $( this ).find( ddComponents ).find( '.current' ).data( 'component' );
				$( this ).find( ddComponents ).find( 'li a' ).on( 'click', function(){
					$( this ).closest( ddComponents ).find( '.current' ).removeClass( 'current' );
					$( this ).parent().addClass( 'current' );
					component = $( this ).data( 'component' );
					showComponent( editor );
					$( this ).closest( ddComponents ).find( 'button span:first-child' ).text( $( this ).text() );

					// Disable dropdown not 
					// required for element
					editor.find( ddClasses ).removeClass( 'disabled' );
					if( !$( this ).data( 'element' ) ) return false;
					var associatedDropdown = '#' + $( this ).data( 'element' );
					$( associatedDropdown ).find( 'li' ).removeClass( 'current' );
					$( associatedDropdown ).find( 'li:first-child' ).addClass( 'current' );
					var disable = $( associatedDropdown ).find( 'li:first-child a' ).data( 'disable' );
					disableDropdowns( editor,  disable );
				});

				// Element dropdown
				$( this ).closest( ddElement ).find( 'button span:first-child' ).text( $( this ).find( ddElement ).find( '.current a' ).text() );
				$( this ).find( ddElement ).each( function(){
					$( this ).find( 'li a' ).on( 'click', function(){

						// Clear field
						editor.find( classField ).html( '' );

						// Swap active
						$( this ).closest( ddElement ).find( '.current' ).removeClass( 'current' );
						$( this ).parent().addClass( 'current' );

						// Swap style el class
						var targetElement = $( this ).data( 'class' );
						$( this ).closest( editor ).find( styleElWrapper ).find( '.style-element' ).removeClass( 'style-element' );
						$( this ).closest( editor ).find( styleElWrapper ).find( '.' + targetElement ).addClass( 'style-element' );

						// Get current classes
						// and remove exclusion classes
						var classes = $( this ).closest( editor )
																.find( '.' + targetElement )
																.clone()
																.removeClass( stripElclasses );
						// Get class attribute
						// and strip target elment
						classes = classes
										.attr( 'class' )
										.replace( targetElement, '' );

						// Add to stylefield
						editor.find( classField ).html( classes );

						// Apply
						applyClasses( editor, true );
						$( this ).closest( ddElement ).find( 'button span:first-child' ).text( $( this ).text() );

						// Disable dropdown not 
						// required for element
						disableDropdowns( editor,  $( this ).data( 'disable' ) );
					});
				});

				// Class dropdown
				$( this ).find( ddClasses ).each( function(){
					$( this ).find( 'li a' ).on( 'click', function(){

						if( $( this ).closest( ddClasses ).hasClass( 'disabled') ) return false;

						// Field reference
						var field = editor.find( classField );

						// Get current class of current dropdown
						var curClass = $( this ).closest( ddClasses ).find( '.current a' ).attr( 'data-class' );
						
						// Delete current tag from field
						$( field ).find( '[data-class="' + curClass + '"]' ).remove();

						// Switch active
						$( this ).closest( ddClasses ).find( '.current' ).removeClass( 'current' );
						$( this ).parent().addClass( 'current' );

						// Get clicked class
						var newClass = $( this ).attr( 'data-class' );
	
						// Get existing and add new class to field
						$( field ).html( $( field ).html() + ' ' + newClass );

						// Replace currently applied class with new
						// class, remove class from style element, delete empty label
						editor.find( styleEl ).removeClass( curClass );
						$( field ).find( '.label' ).each( function(){
							$( this ).find( 'span' ).filter(function() {
							    return $.trim( $( this ).text() ) === '';
							}).parent().remove();
						});

						// Apply new class
						applyClasses( editor, false );
						$( this ).closest( ddClasses ).find( 'button span:first-child' ).text( $( this ).text() );
					});
				});
			});

			// Key event
			$( document ).on( 'keydown', function( event ) {

				// Return Key
				if( event.keyCode === 13 ){
					applyClasses( $( componentEditor ) );
					return false;
				
				// Space Key
				}else if( event.keyCode === 32 ){
					applyClasses( $( componentEditor ) );

				// Backspace key
				}else if( event.keyCode === 8 ){
					removeClasses( $( componentEditor ) );
				}
			});

			// Show components
			function showComponent( editor ){
				$( styleElWrapper ).children().addClass( 'hide' );
				var newComponent = $( componentGroup ).find( '#' + component ).children().clone( true );
				$( styleElWrapper ).children().html( newComponent ).removeClass( 'hide' );

				// Check classes supported and output component html
				classSupport( editor );
			}

			// Check what classes are supported
			// for current component
			function classSupport( editor ){

				// Hide all class dropdowns
				editor.find( ddClasses ).parent().addClass( 'hide' );
				editor.find( ddElement ).parent().addClass( 'hide' );
				editor.find( ddClasses ).find( '.current' ).removeClass( 'current' );
				editor.find( classField ).html( '' );

				// Get supported classes
				var classes =  $( componentGroup ).find( '#' + component ).find( '.style-element' ).data( 'class-support' );

				// Loop through and show
				// appropriate class dropdowns
				// and base values if they exist
				if( !classes ) return false;
				var classArray = String( classes ).split( ';' );
				$.each( classArray , function( i, support ) {
					support = support.split( ':' ); 
					var j = support[0];
					var k = support[1];
					if( j ){
						editor.find( '#' + j ).removeClass( 'hide' );
						var targetitem = !k ? editor.find( classOptions ).find( '#' + j ).find( 'li:first-child' ) : editor.find( classOptions ).find( '#' + j ).find( '[data-class="' + k + '"]' ).parent();
						if( k ){
							// Check defaults for different compoents
							if ( defaults.indexOf(j) > -1) {
								targetitem.addClass( 'current' );
							}
						}else{
							targetitem.addClass( 'current' );
						}
						// Set active in button
						targetitem.closest( ddClasses ).find( 'button span:first-child' ).text( targetitem.text() );
					}
				});

				// Output HTML
				convertHtml( editor );
			}

			// Convert to Text
			function convertHtml( editor ){

			    // Count spaces before first tag
				var html = $( componentGroup ).find( '#' + component ).clone().html();
				/*var sbs = html.substring( 0, html.indexOf( '<' ) );
				var matches = sbs.match( /\t/g ).length;
				console.log(matches)*/

				// Clear what's currently in div
				$( htmlExample ).html('');

				// Clone
				var currentHtml = editor.find( styleElWrapper ).children().clone();

				// Loop through clear attributes and specific classes
				currentHtml.find( '*' ).each( function(){
					if( $( this ).attr( 'data-class-support' ) ){
						$( this ).attr( 'data-class-support', '');
					}
					if( $( this ).attr( 'style' ) ){
						$( this ).attr( 'style', '');
					}
					$( this ).removeClass( 'style-element' );
				});

				// Replace and reindent
				currentHtml = currentHtml.html()
												.replace( /<span class="code-break"><\s*[\/]?span>|<br\s*[\/]?>/g, '\n' )
												.replace( ' data-class-support=""','' )
												.replace( ' style=""','' )
												.replace( ' class=""','' )
												.replace( /</g,'&lt;' )
												.replace( />/g,'&gt;' )
												.replace( /\t\t\t\t\t\t\t/g, '' );
				// Add it back to div
				$( htmlExample ).append('<code><pre><span class="tag">' + currentHtml  + '</span></pre></code>');
			}

			// Get classes from class field
			// and apply to style element
			var applyClasses = function( editor, reset ){
				var field = editor.find( classField );

				// Apply styles
				field.each( function(){
					editor.find( styleEl ).addClass( field.text().replace( /\./g,'' ) );
				});

				// Create tags and output html
				createTags( editor, reset );
				convertHtml( editor );
			};

			// Remove classes on delete
			var removeClasses = function( editor ){
				var field = editor.find( classField );

				// Remove classes
				editor.find( styleEl ).removeClass( field.text() );
				var delay = setInterval( function(){
					editor.find( styleEl ).addClass( field.text() );
					clearInterval( delay );
				});

				// Output html
				convertHtml( editor );
			};

			// Convert text to tags
			var createTags = function( editor, reset ){

				// Remove current spans, count new classes, remove '.'
				var currentTags = editor.find( classField ).clone().find( '.label' ).remove().end();
				var newTags = $.trim( currentTags.text().replace( /\./g,'' ) ).split(' ');

				// Create tags and add them
				if( $.trim( currentTags.text() ).length > 0 ){
					for( var i = 0, l = newTags.length; i < l; i++ ) {
						newTags[ i ] = '<span contenteditable="false" class="label style-' + i + '" data-class="' + newTags[ i ] + '"><a href="#" class="icon-cancel"></a> <span>' + newTags[ i ] + '</span>&nbsp;</span>';
					}

					// Get current tags for reference
					var existingTags = editor.find( classField ).find( '.label' );

					// Clear and reappend current tags, 
					// append new tags, and remove white space
					editor.find( classField ).html('').append( existingTags ).append( newTags );
				}

				// Force caret to end of field content
				forceCaretEnd( editor.find( classField )[0] );
				
				// Add tag actions
				tagActions( editor );

				// Reset ddClass values
				if( reset ) resetDropdowns( editor );
			};

			// Force caret to end of tags
			var forceCaretEnd = function( field ) {
				$( field ).focus();
				if ( typeof window.getSelection != 'undefined' && typeof document.createRange != 'undefined' ) {
					var range = document.createRange();
					range.selectNodeContents( field );
					range.collapse( false );
					var selection = window.getSelection();
					selection.removeAllRanges();
					selection.addRange( range );
				} else if ( typeof document.body.createTextRange != 'undefined' ) {
					var textRange = document.body.createTextRange();
					textRange.moveToElementText( field );
					textRange.collapse( false );
					textRange.select();
				}
			};

			// Tag actions
			var tagActions =  function( editor ){

				// Add actions for tag removal
				editor.find( classField ).find( '.label a' ).each( function(){
					$( this ).off( 'click' );
					$( this ).on( 'click', function( event ){
						event.preventDefault();
						$( this ).closest( editor ).find( styleEl ).removeClass( $( this ).parent().text() );
						$( this ).parent().remove();
						$( this ).closest( editor ).find( classField ).focus();
						$( ddClasses ).find( '.current' ).removeClass( 'current' );
						resetDropdowns( editor );
					});
				});
			};

			// Disable dropdowns
			// in set
			function disableDropdowns ( editor, array ){

				// Disable classes not relating 
				// to element being edited
				editor.find( ddClasses ).removeClass( 'disabled' );
				var disableArray = String( array ).split( ';' );
				$.each( disableArray , function( i, dropdown ) {
					dropdown = dropdown.split( ':' ); 
					var j = dropdown[0];
					if( j ){
						$( '#' + j ).find( ddClasses ).addClass( 'disabled' );
					}
				});
			}

			// Reset class after switching compoent
			// active component area
			var resetDropdowns = function ( editor ){

				// Get supported classes
				var classes =  $( componentGroup ).find( '#' + component ).find( '.style-element' ).data( 'class-support' );

				// Reset values to default of 
				// visible class dropdowns
				if( !classes ) return false;
				var classArray = String( classes ).split( ';' );
				$.each( classArray , function( i, support ) {
					support = support.split( ':' ); 
					var j = support[0];
					var k = support[1];
					if( j ){
						var targetitem = !k ? editor.find( classOptions ).find( '#' + j ).find( 'li:first-child' ) : editor.find( classOptions ).find( '#' + j ).find( '[data-class="' + k + '"]' ).parent();
						if( k ){
							// Check defaults for different compoents
							if ( defaults.indexOf(j) > -1) {
								targetitem.addClass( 'current' );
							}
						}else{
							targetitem.addClass( 'current' );
						}
						// Set active in button
						targetitem.closest( ddClasses ).find( 'button span:first-child' ).text( targetitem.text() );
					}
				});

				// Get field
				var field = editor.find( classField );
				
				// Set ddClass dropdown values
				// to same as current field values
				field.find( '.label' ).each( function(){
					var targetClass = $.trim( $(this).text() );
					var targetDd = $( ddClasses ).find( '[data-class="' + targetClass +'"]' ).closest( ddClasses );
					targetDd.find( '.current' ).removeClass( 'current' );
					targetDd.find( '[data-class="' + targetClass +'"]' ).parent().addClass( 'current' );
					targetDd.find( 'button span:first-child' ).text( targetDd.find( '.current' ).text() );
				});
				convertHtml( editor );
			};
		}
	};

	// Init
	styleEditor.init();
});