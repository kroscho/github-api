export interface GetUserRequest {
  userName: string;
}

export interface BaseUser {
  login: string; // Логин пользователя
  id: number; // Уникальный идентификатор пользователя
  node_id: string; // Идентификатор узла
  avatar_url: string; // URL аватара пользователя
  gravatar_id: string; // ID Gravatar (может быть пустым)
  url: string; // URL к API пользователя
  html_url: string; // URL к профилю пользователя на GitHub
  followers_url: string; // URL для получения подписчиков
  following_url: string; // URL для получения подписок
  gists_url: string; // URL для получения гистов
  starred_url: string; // URL для получения звездных репозиториев
  subscriptions_url: string; // URL для получения подписок на репозитории
  organizations_url: string; // URL для получения организаций пользователя
  repos_url: string; // URL для получения репозиториев пользователя
  events_url: string; // URL для получения событий пользователя
  received_events_url: string; // URL для получения полученных событий
  type: "User"; // Тип пользователя (в данном случае всегда "User")
  site_admin: boolean; // Является ли пользователь администратором сайта
}

export interface User extends BaseUser {
  // поля, которые могут быть null
  name: string | null; // Имя пользователя (может быть null)
  company: string | null; // Компания (может быть null)
  blog: string | null; // Блог (может быть null)
  location: string | null; // Местоположение (может быть null)
  email: string | null; // Email (может быть null)
  hireable: boolean | null; // Возможность найма (может быть null)
  bio: string | null; // Биография (может быть null)
  twitter_username: string | null; // Имя пользователя в Twitter (может быть null)

  public_repos: number; // Количество публичных репозиториев
  public_gists: number; // Количество публичных гистов
  followers: number; // Количество подписчиков
  following: number; // Количество подписок

  created_at: string; // Дата создания аккаунта в формате ISO
  updated_at: string; // Дата последнего обновления аккаунта в формате ISO
}

export interface Following extends BaseUser {
  user_view_type: "public";
}
