create table pages (
  id uuid primary key default uuid_generate_v4(),
  slug text unique,
  title text,
  content jsonb,
  created_at timestamp default now()
);

create table products (
  id uuid primary key default uuid_generate_v4(),
  name text,
  description text,
  image text,
  price numeric,
  created_at timestamp default now()
);

create table leads (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text,
  message text,
  created_at timestamp default now()
);
