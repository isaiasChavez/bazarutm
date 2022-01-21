--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: category_name_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.category_name_enum AS ENUM (
    'ELECTRONICA',
    'HOGAR',
    'LABORATORIO Y TALLER',
    'ROPA',
    'OTROS'
);


ALTER TYPE public.category_name_enum OWNER TO postgres;

--
-- Name: role_name_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.role_name_enum AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public.role_name_enum OWNER TO postgres;

--
-- Name: status_product_name_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_product_name_enum AS ENUM (
    'NUEVO',
    'USADO - COMO NUEVO',
    'USADO - BUEN ESTADO',
    'USADO - LE NETA SI QUIERES LLEVATELO',
    'ENPAQUETADO'
);


ALTER TYPE public.status_product_name_enum OWNER TO postgres;

--
-- Name: user_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_type_enum AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public.user_type_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asset; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asset (
    id integer NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    url character varying(50) NOT NULL,
    title character varying(50) NOT NULL,
    description character varying(150) NOT NULL,
    "productId" integer
);


ALTER TABLE public.asset OWNER TO postgres;

--
-- Name: asset_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asset_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.asset_id_seq OWNER TO postgres;

--
-- Name: asset_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asset_id_seq OWNED BY public.asset.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name public.category_name_enum DEFAULT 'OTROS'::public.category_name_enum NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: producto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producto (
    id integer NOT NULL,
    "statusProductId" integer
);


ALTER TABLE public.producto OWNER TO postgres;

--
-- Name: producto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.producto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.producto_id_seq OWNER TO postgres;

--
-- Name: producto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.producto_id_seq OWNED BY public.producto.id;


--
-- Name: profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profile (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    lastname character varying(100) NOT NULL,
    instagram character varying(100),
    phonenumber character varying(100) NOT NULL,
    telegram character varying(100),
    gender boolean DEFAULT true NOT NULL,
    birthday timestamp without time zone NOT NULL,
    "CREATED_AT" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.profile OWNER TO postgres;

--
-- Name: profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.profile_id_seq OWNER TO postgres;

--
-- Name: profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.profile_id_seq OWNED BY public.profile.id;


--
-- Name: publication; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.publication (
    id integer NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(50) NOT NULL,
    description character varying(150) NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "coverPage" character varying NOT NULL,
    "categoryId" integer,
    "productoId" integer,
    price numeric NOT NULL,
    "userId" integer
);


ALTER TABLE public.publication OWNER TO postgres;

--
-- Name: publication_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.publication_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.publication_id_seq OWNER TO postgres;

--
-- Name: publication_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.publication_id_seq OWNED BY public.publication.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name public.role_name_enum DEFAULT 'USER'::public.role_name_enum NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: status_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.status_product (
    id integer NOT NULL,
    name public.status_product_name_enum DEFAULT 'NUEVO'::public.status_product_name_enum NOT NULL
);


ALTER TABLE public.status_product OWNER TO postgres;

--
-- Name: status_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.status_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.status_product_id_seq OWNER TO postgres;

--
-- Name: status_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.status_product_id_seq OWNED BY public.status_product.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(100) NOT NULL,
    type public.user_type_enum DEFAULT 'USER'::public.user_type_enum NOT NULL,
    password character varying(100) NOT NULL,
    "roleId" integer,
    "profileId" integer
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: asset id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asset ALTER COLUMN id SET DEFAULT nextval('public.asset_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: producto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto ALTER COLUMN id SET DEFAULT nextval('public.producto_id_seq'::regclass);


--
-- Name: profile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile ALTER COLUMN id SET DEFAULT nextval('public.profile_id_seq'::regclass);


--
-- Name: publication id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication ALTER COLUMN id SET DEFAULT nextval('public.publication_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: status_product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status_product ALTER COLUMN id SET DEFAULT nextval('public.status_product_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: asset; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.asset (id, uuid, url, title, description, "productId") FROM stdin;
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name) FROM stdin;
1	ELECTRONICA
2	HOGAR
3	LABORATORIO Y TALLER
4	ROPA
5	OTROS
\.


--
-- Data for Name: producto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.producto (id, "statusProductId") FROM stdin;
1	4
2	4
3	4
4	4
5	3
6	3
7	3
8	3
9	3
10	4
11	3
\.


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.profile (id, name, lastname, instagram, phonenumber, telegram, gender, birthday, "CREATED_AT") FROM stdin;
1	Isaías	Chávez	\N	9511212436	\N	t	2021-12-24 10:35:35.698	2021-12-24 10:35:35.703125
2	Isaías	Chávez	\N	9511212436	\N	t	2021-12-24 10:37:36.394	2021-12-24 10:37:36.395253
3	Isaías	Chávez	\N	9511212436	\N	t	2021-12-24 10:39:12.895	2021-12-24 10:39:12.900843
\.


--
-- Data for Name: publication; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.publication (id, uuid, title, description, "isActive", "coverPage", "categoryId", "productoId", price, "userId") FROM stdin;
5	89f41d7c-4032-4852-b908-9061496e82e5	Nueva publicación	lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum lorem impsum\n	t		2	9	20	2
6	3b552eba-c078-443a-919a-fd8010ca73c1	Nueva publ	asdfasdf	t		3	10	2220	2
7	2bff5aa4-5431-414b-88ef-9c6b1665f35a	asdfassss	233	t		3	11	1	2
4	eac68de9-c3f2-4ec5-8c9b-45fcd9b6be09	Publicación 	descripcion	t		4	4	2	2
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, uuid, name) FROM stdin;
1	c73a8734-35b0-41fa-88e5-c66d0fbc1d8c	ADMIN
2	0266305a-187c-4446-9584-4f696fb7ef65	USER
\.


--
-- Data for Name: status_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.status_product (id, name) FROM stdin;
1	USADO - LE NETA SI QUIERES LLEVATELO
2	USADO - BUEN ESTADO
3	USADO - COMO NUEVO
4	NUEVO
5	ENPAQUETADO
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, uuid, email, type, password, "roleId", "profileId") FROM stdin;
1	1587b034-a27a-4ae0-9217-e6899a0cdb93	isaiaschavez.co@gmail.com	USER	$2a$12$VvHYRerkaAAAI.axj8vFm.mLjRUOPJq/WaBshzOMm.fvEnQAXC92S	1	2
2	923bc3c0-e837-4993-9f4c-a4040807c2e5	isaias@gmail.com	USER	$2a$12$TZGXlmv96vl3XrWWVCnvxu1rOVWahgTyiJMxYjxiSg78wzKhQ49fi	2	3
\.


--
-- Name: asset_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asset_id_seq', 1, false);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 5, true);


--
-- Name: producto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.producto_id_seq', 11, true);


--
-- Name: profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.profile_id_seq', 3, true);


--
-- Name: publication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.publication_id_seq', 7, true);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 2, true);


--
-- Name: status_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.status_product_id_seq', 5, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 2, true);


--
-- Name: asset PK_1209d107fe21482beaea51b745e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asset
    ADD CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY (id);


--
-- Name: profile PK_3dd8bfc97e4a77c70971591bdcb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY (id);


--
-- Name: producto PK_5be023b11909fe103e24c740c7d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY (id);


--
-- Name: status_product PK_75f14dd654ff4ddd261d3c843ee; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.status_product
    ADD CONSTRAINT "PK_75f14dd654ff4ddd261d3c843ee" PRIMARY KEY (id);


--
-- Name: publication PK_8aea8363d5213896a78d8365fab; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication
    ADD CONSTRAINT "PK_8aea8363d5213896a78d8365fab" PRIMARY KEY (id);


--
-- Name: category PK_9c4e4a89e3674fc9f382d733f03; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id);


--
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: publication REL_0a0ddf25db39478e001380dce4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication
    ADD CONSTRAINT "REL_0a0ddf25db39478e001380dce4" UNIQUE ("productoId");


--
-- Name: user REL_9466682df91534dd95e4dbaa61; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId");


--
-- Name: publication FK_0a0ddf25db39478e001380dce44; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication
    ADD CONSTRAINT "FK_0a0ddf25db39478e001380dce44" FOREIGN KEY ("productoId") REFERENCES public.producto(id);


--
-- Name: producto FK_35e84bdce1f74b373cf4781ae95; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producto
    ADD CONSTRAINT "FK_35e84bdce1f74b373cf4781ae95" FOREIGN KEY ("statusProductId") REFERENCES public.status_product(id);


--
-- Name: publication FK_4813f58d0507ddc305199d579a4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication
    ADD CONSTRAINT "FK_4813f58d0507ddc305199d579a4" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- Name: user FK_9466682df91534dd95e4dbaa616; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES public.profile(id);


--
-- Name: user FK_c28e52f758e7bbc53828db92194; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES public.role(id);


--
-- Name: publication FK_ca72b09f205afc223b9866471fe; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.publication
    ADD CONSTRAINT "FK_ca72b09f205afc223b9866471fe" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: asset FK_e10f15c52c46d84d33c25b84fdc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asset
    ADD CONSTRAINT "FK_e10f15c52c46d84d33c25b84fdc" FOREIGN KEY ("productId") REFERENCES public.producto(id);


--
-- PostgreSQL database dump complete
--

