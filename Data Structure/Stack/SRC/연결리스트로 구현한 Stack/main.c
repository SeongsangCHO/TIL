/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/23 20:25:03 by secho             #+#    #+#             */
/*   Updated: 2020/04/23 21:33:49 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "stack.h"

int main(void)
{
	t_stack *stack;
	t_node *new;

	stack = init_stack();
	push(stack, 3);
	push(stack, 4);
	push(stack, 5);
	printf("%d\n",stack->top->data);
	new = stack->top->next;
	printf("%d\n",new->data);
	pop(stack);
	pop(stack);
	pop(stack);
	pop(stack);
	isEmpty(stack);

	push(stack, 7);
	printf("stack size is = %d\n",stack_size(stack));
	printf("peek is %d\n",peek(stack)->data);
	isEmpty(stack);
	clear(stack);
	//isEmpty(stack);
	//printf("peek is %d\n",peek(stack)->data);
}
