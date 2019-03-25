module Jekyll
	module BetterSortFilter
   		def better_sort(input, key)
	   		input.sort { |a, b| a[key].casecmp(b[key]) }
	   		# pp(input)
	   end
	end
end
Liquid::Template.register_filter(Jekyll::BetterSortFilter)