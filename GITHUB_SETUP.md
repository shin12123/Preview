# Настройка GitHub Pages - Пошаговая инструкция

## 1. Настройка репозитория

### Включение GitHub Pages:
1. Перейдите в ваш репозиторий `Preview`
2. Откройте `Settings` → `Pages`
3. В разделе "Source" выберите **"GitHub Actions"**
4. Сохраните настройки

### Проверка ветки:
- Убедитесь, что основная ветка называется `master` (не `main`)
- Если ветка называется `main`, переименуйте её в `master` или обновите workflow

## 2. Настройка Actions

### Вариант 1 (рекомендуется):
- Используется workflow `deploy.yml`
- Автоматически создает ветку `gh-pages`
- Требует настройки "GitHub Actions" в Pages

### Вариант 2 (альтернативный):
- Используется workflow `deploy-alternative.yml`
- Также создает ветку `gh-pages`
- Более простой подход

## 3. Решение проблем

### Ошибка "git failed with exit code 128":
1. **Проверьте права доступа:**
   - Перейдите в `Settings` → `Actions` → `General`
   - Убедитесь, что "Actions permissions" установлено в "Allow all actions and reusable workflows"

2. **Проверьте настройки Pages:**
   - В `Settings` → `Pages` должен быть выбран источник "GitHub Actions"
   - НЕ выбирайте "Deploy from a branch"

3. **Очистите кэш Actions:**
   - Перейдите в `Actions`
   - Нажмите "Clear cache" если доступно

### Если Actions не запускаются:
1. Проверьте, что файл `.github/workflows/deploy.yml` существует
2. Убедитесь, что ветка называется `master`
3. Попробуйте сделать новый push

## 4. Проверка результата

После успешного деплоя:
- Сайт будет доступен по адресу: `https://shin12123.github.io/Preview/`
- В репозитории появится ветка `gh-pages`
- В `Actions` будет видно успешное выполнение workflow

## 5. Альтернативный способ деплоя

Если Actions не работают, можно деплоить вручную:

```bash
npm run build
npm run deploy
```

Это создаст ветку `gh-pages` и задеплоит сайт. 