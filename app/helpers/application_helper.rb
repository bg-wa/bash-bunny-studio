module ApplicationHelper
  def active_page(page_title)
    'is-active' if page_title == @page_title
  end
end
