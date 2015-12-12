<?php include('header.php'); ?>
			<!-- Content -->
			<div class="content clearfix reveal-side-navigation">

				<!-- Back Top -->
				<div class="scroll-to-top">
					<a href="#">Volver arriba</a>
				</div>
				<!-- Back Top End -->

				<!-- Fullscreen Slider Section -->
				<section class="section-block featured-media tm-slider-parallax-container">
					<div class="tm-slider-container full-width-slider fixed-height" data-parallax data-external-padding="60" data-animation="slide" data-scale-under="1140">
						<ul class="tms-slides">
							<li class="tms-slide" data-image data-force-fit>
								<div class="tms-content">
									<div class="tms-content-inner center">
										<div class="row">
											<div class="column width-12">
												<h1 class="tms-caption title-xlarge color-black lspacing-xlarge"
													data-animate-in="opacity:0;scale:1.5px;duration:600ms;easing:easeFastSlow;"
												>
													<blockquote class="icon">
						<span class="icon-quote"></span>
							<p class="lead text-large weight-bold color-charcoal ">Uno de los mejores secretos<br/> de la vida es que todo lo que <br/>vale la pena hacer, <br/>es lo que hacemos por los demás </p>
							<cite>Lewis Carroll</cite>
								</blockquote>
												</h1>
											</div>
										</div>
									</div>
								</div>
								<img data-src="images/contact.jpg" data-retina src="images/blank.png" alt=""/>
							</li>
						</ul>
					</div>
				</section>
				<!-- Fullscreen Slider Section End -->

				<!-- About Intro -->
				<div class="section-block">
					<div class="row">
						<div class="column width-8 offset-2 center horizon" data-animate-in="opacity:0;transY:50;duration:1000;easing:easeFastSlow;" data-threshold="0.5">
								<h2 class="justify">¿Está listo para empezar un proyecto o tiene curiosidad acerca de nuestro proceso? Contáctenos para saber en que podemos colaborar.</h2>
								<ul class="social-list list-horizontal text-line-vertical">
								<span class=" small"></span></a></li>
							</ul>
						</div>
						
					</div>
				</div>
				<!-- About Intro End -->

				

				<!-- Contact Form -->
				<section class="section-block replicable-content contact-2">
					<div class="row">
						
						<div class="column width-8 offset-2 center">
							<h4 class="mb-30 justify">Nos gusta estar preparados para nuestra primera cita, por favor llene nuestro formulario con el mayor detalle posible. Estaremos encantados de responder todas sus preguntas.</h4>
							<div class="contact-form-container">
								<form class="contact-form" action="php/send-email.php" method="post" novalidate>
									<div class="row">
										<div class="column width-6">
											<input type="text" name="fname" class="form-fname form-element large" placeholder="Nombre*" tabindex="1" required>
										</div>
										<div class="column width-6">
											<input type="text" name="fname" class="form-fname form-element large" placeholder="Telefono*" tabindex="1" required>
										</div>
										
										<div class="column width-6">
											<input type="email" name="email" class="form-email form-element large" placeholder="Email*" tabindex="3" required>
										</div>
										<div class="column width-6">
											<input type="text" name="website" class="form-website form-element large" placeholder="Web Site" tabindex="4">
										</div>
										<div class="column width-6">
											<input type="text" name="honeypot" class="form-honeypot form-element large">
										</div>
									</div>
									<div class="row">
										<div class="column width-12 center">
											<textarea name="message" class="form-message form-element medium" placeholder="Mensaje*" tabindex="5" required></textarea>
											<input type="submit" value="Enviar" class="form-submit button medium bkg-black bkg-hover-pink color-white color-hover-white">
										</div>
									</div>
								</form>
								<div class="form-response center"></div>
							</div>
						</div>
					</div>
				</section>
				<!--Contact Form End -->

			</div>
			<!-- Content End -->
<!-- About Section -->
				<div class="section-block bkg-charcoal ">
					<div class="row">
						<div class="column width-6 center horizon" data-animate-in="opacity:0;transY:50;duration:1000;easing:easeFastSlow;" data-threshold="1">
							<h2 class="mb-30 color-white">Preguntas</h2>
							<p class="color-grey-light">Si quiere enviar un correo con información específica a uno de nuestros departamentos o miembros del equipo.</p>
							<a href="mailto:#" class="button medium bkg-white bkg-hover-pink color-charcoal color-hover-white">info@creativasoftline.com</a>
						</div>
						<div class="column width-6 center horizon" data-animate-in="opacity:0;transY:50;duration:1000;delay:200ms;easing:easeFastSlow;" data-threshold="1">
							<h2 class="mb-30 color-white">Lo esperamos en:</h2>
							<p class="color-grey-light">9 Oriente Norte #341 segunda planta. <br> + 52 (01 961) 61 242 58 </p>
							<a data-content="iframe" href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.4569572496616!2d-93.1103696855595!3d16.753926125175365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ecd88f50894775%3A0xed2073a8ee237f07!2sCreativa+Softline!5e0!3m2!1ses!2smx!4v1448847669295" class="lightbox-link button medium bkg-white bkg-hover-pink color-charcoal color-hover-white">Ver en Google Maps</a>
						</div>
					</div>
				</div>
				<!-- About Section End -->
					<?php include('footer.php'); ?>
