/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/25 12:21:13 by secho             #+#    #+#             */
/*   Updated: 2020/04/25 12:41:32 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "stack.h"

int main(void)
{
	t_stack *stack;

	stack = stack_init();
	push(stack, 10);
	push(stack, 20);
	push(stack, 30);
	push(stack, 40);
	print_stack(stack);
	pop(stack);
	print_stack(stack);
	pop(stack);
	print_stack(stack);
	pop(stack);
	printf("top = %d\n",stack->top);
	print_stack(stack);
	clear(stack);
	print_stack(stack);
	return (0);
}
