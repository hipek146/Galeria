import React from 'react';
import * as noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.css';
import '../styles/Slider.css';


export default class Slider extends React.Component {
  constructor() {
    super();
    this.first = {value: 0};
    this.update = this.update.bind(this);
  }
  componentDidMount() {
    noUiSlider.create(this.ref, {
      start: [this.props.min, this.props.max],
      connect: true,
      margin: Math.ceil((this.props.max - this.props.min) / 10),
      range: {
        'min': this.props.min,
        'max': this.props.max
      },
      format: {
       // 'to' the formatted value. Receives a number.
       to: function (value) {
           return parseInt(value);
       },
       from: function (value) {
            return Number(value);
        },
     }
    });
    this.ref.noUiSlider.on('update', this.update);
    var ref = this.ref;
    var update = this.props.update;
    this.first.addEventListener('change', function() {
        ref.noUiSlider.set(this.value);
    });
    this.second.addEventListener('change', function() {
        ref.noUiSlider.set([ref.noUiSlider.get()[0], this.value]);
    });
    this.ref.noUiSlider.on('set', function() {
      update({min: ref.noUiSlider.get()[0], max: ref.noUiSlider.get()[1]})
    });
  }

  update(values, handle) {
    if(handle) {
      this.second.value = values[handle];
    }
    else {
      this.first.value = values[handle];
    }
  }

  change(element) {
    //this.ref.noUiSlider.set(this.value);
  }

  render() {
    return (
        <div className="slider" >
            <div className="sliderUpper">
                <input className="sliderInput" defaultValue="0" ref={ref => this.first = ref} />
                <div className="sliderHeader">
                    {this.props.name}
                </div>
                <input className="sliderInput" defaultValue="0" ref={ref => this.second = ref} />
            </div>
            <div ref={ref => this.ref = ref} />
        </div>
    );
  }
}
