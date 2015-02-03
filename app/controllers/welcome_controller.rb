class WelcomeController < ApplicationController
  def index

  end

  def generate_pdf
    kit = PDFKit.new(params[:html], :page_size => 'Letter')
    kit.stylesheets << Rails.root.join('app', 'assets', 'stylesheets', 'pdf.css')
# Get an inline PDF
    pdf = kit.to_pdf
# Save the PDF to a file
    file = kit.to_file('D://save_pdf/test.pdf')
  end

end
