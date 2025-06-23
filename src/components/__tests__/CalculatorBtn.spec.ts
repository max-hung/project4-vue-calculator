import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CalculatorBtn from '@/components/CalculatorBtn.vue'

describe('CalculatorBtn.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(CalculatorBtn, {
      props: { icon: '+', type: 'operator' },
      slots: {
        default: '+',
      },
    })
    expect(wrapper.text()).toContain('+')
  })

  it('applies correct class for type "function"', () => {
    const wrapper = mount(CalculatorBtn, {
      props: { icon: 'AC', type: 'function' },
      slots: { default: 'AC' },
    })
    expect(wrapper.classes()).toContain('bg-gray-400')
    expect(wrapper.classes()).toContain('text-black')
  })

  it('applies correct class for type "operator"', () => {
    const wrapper = mount(CalculatorBtn, {
      props: { icon: '+', type: 'operator' },
      slots: { default: '+' },
    })
    expect(wrapper.classes()).toContain('bg-orange-500')
    expect(wrapper.classes()).toContain('text-white')
  })

  it('applies correct class for type "number"', () => {
    const wrapper = mount(CalculatorBtn, {
      props: { icon: '1', type: 'number' },
      slots: { default: '1' },
    })
    expect(wrapper.classes()).toContain('bg-gray-800')
    expect(wrapper.classes()).toContain('text-white')
  })

  it('applies "invisible" class for type "empty"', () => {
    const wrapper = mount(CalculatorBtn, {
      props: { icon: '', type: 'empty' },
      slots: { default: '' },
    })
    expect(wrapper.classes()).toContain('invisible')
  })
})
