DELETE FROM book;
ALTER TABLE book AUTO_INCREMENT = 1001;

DELETE FROM category;
ALTER TABLE category AUTO_INCREMENT = 1001;

INSERT INTO `category` (`name`) VALUES ('New Releases'),('Fantasy'),('Horror'),('History'),('Romance');

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('First Lie Wins', 'Ashley Elsten', 'FIRST LIE WINS is about a woman who''s a con artist and completes ... First Lie Wins lived up to the hype.', 5.99, 4.5, TRUE, TRUE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('It starts with us', 'Collen Hoover', 'It Starts With Us is a novel by Colleen Hoover that tells the story of Lily Bloom and Atlas Corrigan. The story is about the two characters trying to rekindle their teenage love as adults while dealing with the consequences of their past relationships.', 7.49, 4.7, TRUE, FALSE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Never Lie', 'Freida McFadden', ' The book is about newlyweds Tricia and Ethan who are trapped in a remote manor during a storm and discover that it was once owned by Dr. Adrienne Hale, a renowned psychiatrist who went missing years ago.', 18.10, 4.8, TRUE, TRUE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Weyward', 'Emilia Hart', 'New Release', 19.89, 4.5, FALSE, TRUE, 1001);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Onyx Storm', 'Rebecca Yarros', 'New Release', 32.89, 4.5, FALSE, FALSE, 1001);

INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Fourth Wing', 'Rebecca Yarros', 'A young scribe is thrust into an elite war college for dragon riders where the only rule is graduate or perish', 16.59, 3.8, TRUE, TRUE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Court of Winter', 'Krista Street', 'Court of Winter is book one in a four-book enemies-to-lovers fae fantasy romance that takes place in Krista Street''s Supernatural World', 13.49, 4.4, FALSE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Martyr', 'Kaveh Akbar', 'The perfect blend of romance and fantasy', 15.99, 4.8, TRUE, TRUE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Dune', 'Frank Herbert', 'Lisan Al Gayib', 21.59, 4.8, TRUE, FALSE, 1002);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('A Little Life', 'Hanya Yanagihara', 'New Addition', 15.59, 4.8, TRUE, TRUE, 1002);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Intercepts', 'T.J. Payne', 'Intercepts is a horror novel by T.J. Payne. It is about Joe Gerhard, who works at a secret facility that conducts human experiments. ', 11.66, 4.5, FALSE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Hidden Pictures', 'Jadon Rekulak', 'Hidden Pictures is a 2022 horror/thriller novel by Jason Rekulak. It tells the story of Mallory Quinn, a woman who becomes a nanny for a five-year-old boy named Teddy.', 12.58, 4.0, TRUE, TRUE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Silent Patient', 'Alex Michaelides', 'The Silent Patient is a psychological thriller by Alex Michaelides. It is about an English psychotherapist, Theo Faber, who is dealing with a patient who has gone mute after killing her husband.', 10.59, 2.5, TRUE, FALSE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('I am Watching You', 'Teresa Driscoll', 'I Am Watching You is a psychological thriller novel by Teresa Driscoll. It''s about Ella Longfield, who overhears two men flirting with teenage girls on a train.', 8.99, 4.9, TRUE, TRUE, 1003);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Amityville Horror', 'Jay Anson', 'New Addition', 21.59, 4.8, TRUE, FALSE, 1003);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Trust', 'Hernan Diaz', 'Trust is a 2022 novel written by Hernan Diaz. The novel was published by Riverhead Books. Set predominantly in New York City and focusing on the world of finance, the novel is a metafictional look at a secretive financier and his wife.',11.99, 4.6, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The League', 'John Eisenberg', 'The League by John Eisenberg is a cultural history book that explores the National Football League''s (NFL) history. ', 14.88, 4.8, FALSE, TRUE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Wall', 'Alistair Moffat', 'The Wall: Romes Greatest Frontier.', 15.15, 4.9, TRUE, FALSE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Endurance', 'Alfred Lansing', 'Endurance: Shackleton''s Incredible Voyage is a book by Alfred Lansing that tells the true story of Ernest Shackleton''s 1914-1917 expedition to Antarctica. The book is based on journal entries from crew members and interviews with survivors.',13.59, 4.2, TRUE, TRUE, 1004);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Escape Artist', 'Jonathan Freedland', 'New Addition', 26.59, 4.5, TRUE, TRUE, 1004);


INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Goal', 'Elle Kennedy', 'Romantic',14.99, 4.3, TRUE, TRUE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('The Bride', 'Ali Hazelwood', 'Romantic ', 24.88, 4.5, FALSE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Icebreaker', 'Hannah Grace', 'Romantic.', 19.15, 4.9, TRUE, TRUE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Daydream', 'Hannah Grace', 'Romantic.',23.59, 4.6, TRUE, FALSE, 1005);
INSERT INTO `book` (title, author, description, price, rating, is_public, is_featured, category_id) VALUES ('Verity', 'Collen Hoover', 'Romantic', 27.59, 4.8, TRUE, TRUE, 1005);

