INSERT INTO authors (name, email, bio)
VALUES
    (
        'Elena Rostova',
        'elena.rostova@literamail.com',
        'Escritora de ciencia ficción y licenciada en Astrofísica. Pasa sus días creando mundos distópicos donde la inteligencia artificial y la filosofía humana chocan. Nacida en Madrid, ha publicado dos novelas premiadas sobre viajes en el tiempo.'
    ),
    (
        'Mateo Silva',
        'mateosilvabooks@writepost.net',
        'Periodista de investigación convertido en novelista de thriller psicológico. Sus historias destacan por giros inesperados y un profundo desarrollo criminalístico. Vive en Buenos Aires rodeado de libros antiguos y tazas de café frío.'
    );

INSERT INTO posts (author_id, title, content, published)
VALUES
    (
        (SELECT id FROM authors WHERE email = 'elena.rostova@literamail.com'),
        'El eco del silicio',
        '¿Qué pasa cuando una inteligencia artificial empieza a recordar cosas que nunca vivió? Hoy analizo los límites de la memoria digital.',
        true
    ),
    (
        (SELECT id FROM authors WHERE email = 'elena.rostova@literamail.com'),
        'Mundos sin reloj',
        'Escribir sobre viajes en el tiempo te hace perder la noción de las horas. Capítulo 3 terminado.',
        true
    ),
    (
        (SELECT id FROM authors WHERE email = 'mateosilvabooks@writepost.net'),
        'La mente del sospechoso',
        'El secreto de un buen thriller no es descubrir quién es el asesino, sino entender por qué lo hizo.',
        true
    );