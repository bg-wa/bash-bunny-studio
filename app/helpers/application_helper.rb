module ApplicationHelper
  def active_page(path)
    'active' if request.url.include?(path)
  end
end
