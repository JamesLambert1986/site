import $ from 'jquery'

const Vmcharts = (($) => {
  return {
    compatible_view: () => {

      // #UT-VMCharts1
      $('.container--chart:not(.chart--line) .chart .data').each(function(index){

        var $this = $(this);

        $this.css({'height':$this.attr('data-percent') + '%'});
      });

      // #UT-VMCharts2
      $('.chart--line .chart .data').each(function(index){

        var $this = $(this);

        $this.css({'bottom':$this.attr('data-percent') + '%'});
      });

      // #UT-VMCharts3
      $('.chart .chart__y-axis .group').each(function(index){

        var $this = $(this);

        $this.css({'height':$this.attr('data-percent') + '%'});
      });

      // #UT-VMCharts4
      $('.chart .chart__x-axis .guideline').each(function(index){

        var $this = $(this);
        $this.css({'height':$this.attr('data-percent') + '%'});
      });

      // TO DO: Unit test
      $('.chart--stacked .chart .data').each(function(index){

        var $this = $(this);

        $this.css({'flex': '0 0 '+$this.attr('data-percent') + '%'});
      });

      // TO DO: Unit test
      $('.chart--linear-pie .chart .data').each(function(index){

        var $this = $(this);

        $this.css({'flex': '0 0 '+$this.attr('data-percent') + '%'});
      });

      // TO DO: Unit test
      $('.container--chart').each(function(index){

        var $this = $(this);
        var chart_id = $this.attr('id')
        
        var style = $this.attr('data-style');
        
        if(style != "" && typeof style != "undefined"){
          

          if(typeof chart_id == 'undefined' || chart_id == false){

            var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            var chart_id = randLetter + Date.now();

            $this.attr('id',chart_id);
          }


          var arrStyles = style.split(';');

          
          var inlinestyles = "";

          $(arrStyles).each(function(index){
            if(this == "")
              return;
              
              var rule = this.split(':');

              var i = parseInt(rule[0].replace('--colour-chart-',''));
              var value = rule[1].trim();

              inlinestyles += "#"+chart_id+" .chart .data:nth-child("+i+") { color: "+value+" !important;}";
              inlinestyles += "#"+chart_id+" .chart__key .key__btn:not(.key__btn--clear):nth-child("+(i+1)+"):before { background: "+value+" !important; }";
              inlinestyles += "#"+chart_id+".chart--line .chart svg:nth-of-type("+i+") path { stroke: "+value+" !important; }";
          });

          $this.append('<style>'+inlinestyles+'</style>');
        }
      });

    },
    setDataSet: (chart_id,set) => {  

      // #UT-VMCharts5
      $('#'+chart_id).attr('data-set',set);

      // Charts
      $('#'+chart_id+' .group .data:nth-of-type('+set+')').toggleClass('selected');
      
      // Line charts
      $('.chart--line #'+chart_id+' svg:nth-of-type('+set+')').toggleClass('selected');

      // Pie charts
      $('.chart--pie #'+chart_id+' svg circle:nth-of-type('+set+')').toggleClass('selected');
      $('.chart--pie #'+chart_id+' ul li:nth-child('+set+')').toggleClass('selected');
    },
    init : () => {

      // Turn the key into a series of buttons
      $('.key__btn').attr('role','button');

      $('body').on("click", ".key__btn", function(e){

        const $this = $(this);
        const chart_id = $this.attr('data-chartid');
        const set = $this.attr('data-index');

        if (set == "all"){


          $('#'+chart_id+' .selected').removeClass('selected');
          $('.key__btn[data-chartid="'+chart_id+'"]').removeClass('active');

        }
        else if($this.hasClass('active')){
          
          $this.removeClass('active');
          Vmcharts.setDataSet(chart_id,set);
        }
        else {

          $('.key__btn--clear[data-chartid="'+chart_id+'"]').addClass('show');
          $this.addClass('active');
          $('#'+chart_id).addClass('active');
          Vmcharts.setDataSet(chart_id,set);
        }

        // If not buttons are selected
        if($('.key__btn[data-chartid="'+chart_id+'"].active').length == 0){
          
          $this.removeClass('active');
          $('#'+chart_id).removeAttr('data-set');
          $('#'+chart_id).removeClass('active');
          $('.key__btn--clear[data-chartid="'+chart_id+'"]').removeClass('show');
        }

      });


      $('body').on("mouseenter", ".chart .data", function(e){

        const index = $(this).attr('data-index');
        const $chart = $(this).closest('.chart');
        
        if($chart.find('.range[data-index="'+index+'"]').length){

          $chart.find('.line[data-index="'+index+'"]').addClass('invert');
          $chart.find('.range[data-index="'+index+'"]').addClass('show');
        }
      }).on("mouseleave", ".chart .data", function(e){

        const $chart = $(this).closest('.chart');
        $chart.find('.range.show').removeClass('show');
        $chart.find('.line.invert').removeClass('invert');
      });

      if (!window.CSS || !window.CSS.supports || !window.CSS.supports('(--foo: red)')) {

        Vmcharts.compatible_view();
      }

    }  
  }
})($)

export default Vmcharts