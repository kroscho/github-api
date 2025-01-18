export interface GetRepositoriesRequest {
  userName: string;
}

export interface Owner {
  login: string; // Логин владельца
  id: number; // Уникальный идентификатор владельца
  node_id: string; // Идентификатор узла
  avatar_url: string; // URL аватара владельца
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
  type: "User"; // Тип владельца (в данном случае всегда "User")
  site_admin: boolean; // Является ли владелец администратором сайта
}

export interface Repository {
  id: number; // Уникальный идентификатор репозитория
  node_id: string; // Идентификатор узла репозитория
  name: string; // Название репозитория
  full_name: string; // Полное название репозитория (например, "kroscho/auth")
  private: boolean; // Является ли репозиторий приватным
  owner: Owner; // Владелец репозитория (объект Owner)
  html_url: string; // URL к странице репозитория на GitHub
  description?: string | null; // Описание репозитория (может быть null)
  fork: boolean; // Является ли репозиторий форком
  url: string; // URL к API репозитория
  created_at: string; // Дата создания в формате ISO
  updated_at: string; // Дата последнего обновления в формате ISO
  pushed_at: string; // Дата последнего пуша в формате ISO
  git_url: string; // Git URL для доступа к репозиторию
  ssh_url: string; // SSH URL для доступа к репозиторию
  clone_url: string; // HTTPS URL для клонирования репозитория
  svn_url: string; // SVN URL для доступа к репозиторию
  homepage?: string | null; // Главная страница (может быть null)
  size: number; // Размер репозитория в килобайтах
  stargazers_count: number; // Количество звезд у репозитория
  watchers_count: number; // Количество наблюдателей за репозиторием
  language?: string | null; // Язык программирования (может быть null)
  has_issues: boolean; // Поддерживает ли репозиторий проблемы (issues)
  has_projects: boolean; // Поддерживает ли репозиторий проекты (projects)
  has_downloads: boolean; // Поддерживает ли репозиторий загрузки (downloads)
  has_wiki: boolean; // Поддерживает ли репозиторий вики (wiki)
  has_pages: boolean; // Поддерживает ли репозиторий GitHub Pages
  has_discussions: boolean; // Поддерживает ли репозиторий обсуждения (discussions)
  forks_count: number; // Количество форков данного репозитория
  archived: boolean; // Является ли репозиторий архивированным
  disabled: boolean; // Является ли репозиторий отключенным (disabled)
  open_issues_count: number; // Количество открытых проблем (issues)
  license?: any | null; // Лицензия (может быть null)
  allow_forking: boolean; // Разрешает ли форки данного репозитория
  is_template: boolean; // Является ли данный репозиторий шаблоном (template)
  topics?: string[] | null; // Темы, связанные с данным репозиторием (может быть пустым или null)
  visibility?: "public" | "private" | "internal"; // Видимость репозитория (может быть public, private или internal)
}
