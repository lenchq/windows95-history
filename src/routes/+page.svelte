<script lang="ts">
	import '98.css';
	import TitleBar from '$lib/components/TitleBar.svelte';
	import windows95_box from '$lib/assets/windows95box.jpg';
	import windows95_desktop from '$lib/assets/desktop.png';
	import windows2000 from '$lib/assets/windows2000.jpg';
	import win95_start from '$lib/assets/start.jpg';
	import win95_start_desktop from '$lib/assets/win95_start.jpg';
	import windows95_commercial from '$lib/assets/windows95_commercial.mp4';
	import start_me_up from '$lib/assets/start_me_up.mp3';
</script>

<div class="page flex w-full flex-col place-items-center pt-10">
	<header class="window w-[45%] text-white shadow-lg">
		<TitleBar />
		<div class="window-body container mx-auto text-center">
			<h1 class="text-4xl font-bold">История Windows 95</h1>
			<p class="mt-2 text-lg">Путешествие в прошлое операционных систем</p>
		</div>
	</header>

	<main class="container mx-auto flex flex-col gap-y-4 px-4 py-8">
		<article class="window">
			<TitleBar text="Запуск Windows 95" />
			<div class="window-body flex">
				<div class="text-base">
					<p class="mb-4">
						<a href="https://ru.wikipedia.org/wiki/Windows_95">Windows 95</a> была выпущена
						компанией <a href="https://ru.wikipedia.org/wiki/Microsoft">Microsoft</a> 24 августа
						1995 года. Эта
						<a
							href="https://ru.wikipedia.org/wiki/%D0%9E%D0%BF%D0%B5%D1%80%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D0%B0%D1%8F_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0"
							>операционная система</a
						>
						стала революцией в мире ОС для персонального использовала, представив пользователям новую
						графическую оболочку, поддержку долгих имен файлов и многозадачность.
					</p>
					<p class="mb-4">
						Введение <a href="https://w.wiki/CTmo">кнопки «Пуск»</a>,
						<a
							href="https://ru.wikipedia.org/wiki/%D0%9F%D0%B0%D0%BD%D0%B5%D0%BB%D1%8C_%D0%B7%D0%B0%D0%B4%D0%B0%D1%87"
							>панели задач</a
						> и окна проводника изменило способ взаимодействия пользователей с ПК, сделав его более интуитивным
						и удобным.
					</p>
				</div>
				<div class="">
					<img src={windows95_box} alt="Коробка Windows 95" />
					<p class="mt-2 text-sm text-gray-700">
						Коробка <a href="https://ru.wikipedia.org/wiki/Windows_95">Windows 95</a>, ставшая
						иконой своего времени
					</p>
				</div>
			</div>
		</article>

		<div class="flex gap-x-3">
			<article class="window w-1/2">
				<TitleBar text="Ключевые особенности" />
				<div class="window-body flex flex-col-reverse gap-y-8">
					<div class="w-[400px]">
						<img
							class="border-2 border-black"
							src={windows95_desktop}
							alt="Рабочий стол Windows 95"
						/>
						<p class="mt-2 text-sm text-gray-700">
							Рабочий стол Windows 95, демонстрирующий интерфейс
						</p>
					</div>
					<div class="text-base">
						<ul class="list-inside list-disc space-y-2">
							<li>
								Интуитивный графический интерфейс с
								<a href="https://w.wiki/CTmo">кнопкой «Пуск»</a>
								.
							</li>
							<li>
								Поддержка <a href="https://ru.wikipedia.org/wiki/Plug_and_Play">Plug and Play</a> для
								упрощения установки оборудования.
							</li>
							<li>
								Возможность работы с
								<a href="https://ru.wikipedia.org/wiki/32_%D0%B1%D0%B8%D1%82%D0%B0">32-битными</a>
								приложениями.
							</li>
							<li>Поддержка долгих имен файлов (до 255 символов).</li>
							<li>
								Новая файловая система <a href="https://ru.wikipedia.org/wiki/FAT32">FAT32</a> (в поздних
								версиях).
							</li>
							<li>
								Интеграция с интернетом через <a
									href="https://ru.wikipedia.org/wiki/Internet_Explorer_1">Internet Explorer 1.0</a
								> (включён в комплект поставки).
							</li>
						</ul>
					</div>
				</div>
			</article>
			<article class="window w-[70%]">
				<TitleBar text="Рекламная кампания" />
				<div class="flex flex-col gap-x-3">
					<div class="text-base">
						<p class="mb-4">
							Для запуска <a href="https://ru.wikipedia.org/wiki/Windows_95">Windows 95</a> была
							проведена одна из самых масштабных рекламных кампаний в истории технологий. Microsoft
							использовала песню
							<a href="https://ru.wikipedia.org/wiki/Start_Me_Up">Rolling Stones "Start Me Up"</a> для
							продвижения своей кнопки «Пуск». В день выпуска операционной системы в очередях за копией
							стояли тысячи людей.
						</p>
						<p class="mb-4">
							Также Microsoft выпустила обучающее видео, в котором участвовали знаменитости
							Дженнифер Энистон и Мэттью Перри, рассказывая о новых функциях системы.
						</p>
					</div>
					<div class="flex place-content-around place-items-center py-10">
						<div class="window">
							<TitleBar small text="Rolling Stones - Start Me Up" />
							<audio class="window-body" controls src={start_me_up}></audio>
						</div>
						<div class="window flex flex-col">
							<TitleBar small text="Рекламный ролик Windows 95" />
							<div class="window-body !m-0">
								<video controls src={windows95_commercial}> <track kind="captions" /></video>
							</div>
						</div>
					</div>
				</div>
			</article>
		</div>

		<article class="window">
			<TitleBar text="Будущее Windows 95" />
			<div class="text-base">
				<p class="mb-4">
					<a href="https://ru.wikipedia.org/wiki/Windows_95">Windows 95</a> заложила фундамент для дальнейшего
					развития операционных систем. Её концепции и интерфейсные решения стали стандартом для будущих
					версий Windows. Многие идеи, такие как кнопка «Пуск» и панель задач, продолжали использоваться
					и модернизироваться.
				</p>
				<p class="mb-4">
					В начале 2000-х годов Microsoft сосредоточилась на интеграции сетевых функций,
					безопасности и улучшении пользовательского опыта. Наследие <a
						href="https://ru.wikipedia.org/wiki/Windows_95">Windows 95</a
					>
					продолжало жить в таких продуктах, как
					<a href="https://ru.wikipedia.org/wiki/Windows_98">Windows 98</a>,
					<a href="https://ru.wikipedia.org/wiki/Windows_Me">Windows ME</a>
					и, наконец, <a href="https://ru.wikipedia.org/wiki/Windows_XP">Windows XP</a>, которая
					стала одной из самых успешных ОС компании.
				</p>
			</div>
		</article>
		<article class="window">
			<TitleBar text="Эволюция в Windows 2000"></TitleBar>
			<div class="flex gap-x-3">
				<div class="text-base">
					<p class="mb-4">
						<a href="https://ru.wikipedia.org/wiki/Windows_2000">Windows 2000</a> стала важной вехой
						в развитии операционных систем Microsoft. Она объединила потребительские и
						профессиональные версии, базируясь на архитектуре
						<a href="https://ru.wikipedia.org/wiki/Windows_NT">Windows NT</a>. Эта ОС предоставила
						улучшенную надёжность, безопасность и сетевые возможности.
					</p>
					<p class="mb-4">
						<a href="https://ru.wikipedia.org/wiki/Windows_2000">Windows 2000</a> унаследовала
						многие функции
						<a href="https://ru.wikipedia.org/wiki/Windows_95">Windows 95</a>
						, такие как поддержка Plug and Play, но включила более современный подход к управлению памятью,
						улучшения в файловой системе
						<a href="https://ru.wikipedia.org/wiki/NTFS">NTFS</a>
						и сетевые функции для корпоративных пользователей. Её выпуск стал подготовкой к успешному
						запуску <a href="https://ru.wikipedia.org/wiki/Windows_XP">Windows XP</a> в 2001 году.
					</p>
				</div>
				<div>
					<img src={windows2000} class="w-[800px]" alt="Логотип >Windows 2000" />
					<p class="mt-2 text-sm text-gray-700">
						Логотип <a href="https://ru.wikipedia.org/wiki/Windows_2000">Windows 2000</a>, символ
						новой эпохи
					</p>
				</div>
			</div>
		</article>

		<article class="window w-fit place-self-center">
			<TitleBar text="Опробовать Windows 90-х" />
			<div class="window-body flex gap-x-3">
				<div class="w-full text-center text-3xl font-bold">Попробуйте Windows 90-х годов сами!</div>
			</div>
		</article>

		<div class="flex w-full place-content-around gap-x-5">
			<article class="window aspect-[4/3] w-[40%]">
				<TitleBar small text="Windows 95" />
				<a aria-label="emulator" href="emulator">
					<div
						class="relative flex h-full w-full cursor-pointer place-content-center place-items-center"
					>
						<img class="absolute z-0 w-full blur-[3px]" src={win95_start_desktop} alt="" />
						<div class="relative z-10 flex flex-col place-items-center">
							<img class=" h-16" src={win95_start} alt="" />
						</div>
					</div>
				</a>
			</article>
		</div>
	</main>

	<footer class="py-4 text-white">
		<div class="container mx-auto text-center text-base font-bold">
			<p class="shadow-text">&copy; 2024 ИРИТ-РТФ & Еробкин Илья Евгеньевич 🩷</p>
		</div>
	</footer>
</div>

<style>
	.page {
		background: url('$lib/assets/clouds.png');
		background-position: 0;
		background-repeat: round;
		background-size: cover;
		background-attachment: fixed;
	}
	.shadow-text {
		text-shadow: 1px 1px 2px black;
	}
</style>
